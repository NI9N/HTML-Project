import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { type RequestHandler } from "express";
import { z } from "zod";
import fs from "node:fs/promises";
import { realpathSync } from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const WORKSPACE_ROOT = "/home/runner/workspace";
const ROOT_SEP = WORKSPACE_ROOT + path.sep;

function safeResolvePath(relativePath: string): string {
  const resolved = path.resolve(WORKSPACE_ROOT, relativePath);

  // Resolve symlinks in the parent directory (catches ancestor symlinks)
  let real = resolved;
  try {
    const parent = path.dirname(resolved);
    const base = path.basename(resolved);
    real = path.join(realpathSync(parent), base);
  } catch {
    // Parent doesn't exist yet (new path for write_file). Use resolved as-is.
  }

  if (real !== WORKSPACE_ROOT && !real.startsWith(ROOT_SEP)) {
    throw new Error(`Path escapes workspace root: ${relativePath}`);
  }
  return resolved;
}

const mcpServer = new McpServer({
  name: "hungry-ninja-replit",
  version: "1.0.0",
});

mcpServer.tool(
  "ping",
  "Returns pong — verify MCP connection is working",
  {},
  async () => ({ content: [{ type: "text", text: "pong" }] }),
);

mcpServer.tool(
  "project_info",
  "Returns project structure overview and key file pointers",
  {},
  async () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            workspace: WORKSPACE_ROOT,
            stack: "pnpm monorepo, Node.js 24, TypeScript 5.9",
            artifacts: {
              "api-server": "artifacts/api-server — Express 5 API (port 8080, path /api)",
              "mockup-sandbox": "artifacts/mockup-sandbox — Vite component preview",
            },
            libs: "lib/ — shared packages",
            keyFiles: {
              designGuide: "DESIGN_GUIDE.md",
              dbSchema: "lib/db/src/schema.ts (if exists)",
              apiSpec: "lib/api-spec/openapi.yaml (if exists)",
            },
          },
          null,
          2,
        ),
      },
    ],
  }),
);

mcpServer.tool(
  "list_files",
  "List files and directories under a path (relative to workspace root). Excludes node_modules and .git.",
  { dir: z.string().default(".").describe("Directory path relative to workspace root") },
  async ({ dir }) => {
    const target = safeResolvePath(dir);
    async function walk(p: string, depth: number): Promise<string[]> {
      if (depth > 4) return [];
      const entries = await fs.readdir(p, { withFileTypes: true });
      const results: string[] = [];
      for (const e of entries) {
        if (["node_modules", ".git", "dist", ".tsbuildinfo"].includes(e.name)) continue;
        const rel = path.relative(WORKSPACE_ROOT, path.join(p, e.name));
        results.push(e.isDirectory() ? `${rel}/` : rel);
        if (e.isDirectory()) {
          results.push(...(await walk(path.join(p, e.name), depth + 1)));
        }
      }
      return results;
    }
    const files = await walk(target, 0);
    return { content: [{ type: "text", text: files.join("\n") }] };
  },
);

mcpServer.tool(
  "read_file",
  "Read the contents of a file (relative to workspace root). Max 500KB.",
  { file: z.string().describe("File path relative to workspace root") },
  async ({ file }) => {
    const target = safeResolvePath(file);
    const stat = await fs.stat(target);
    if (stat.size > 500 * 1024) {
      return { content: [{ type: "text", text: `File too large (${stat.size} bytes). Max 500KB.` }] };
    }
    const content = await fs.readFile(target, "utf-8");
    return { content: [{ type: "text", text: content }] };
  },
);

mcpServer.tool(
  "write_file",
  "Write content to a file (relative to workspace root). Creates parent directories if needed.",
  {
    file: z.string().describe("File path relative to workspace root"),
    content: z.string().describe("File content to write"),
  },
  async ({ file, content }) => {
    const target = safeResolvePath(file);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, content, "utf-8");
    return { content: [{ type: "text", text: `Written ${content.length} chars to ${file}` }] };
  },
);

mcpServer.tool(
  "delete_file",
  "Delete a file (relative to workspace root).",
  { file: z.string().describe("File path relative to workspace root") },
  async ({ file }) => {
    const target = safeResolvePath(file);
    await fs.unlink(target);
    return { content: [{ type: "text", text: `Deleted ${file}` }] };
  },
);

mcpServer.tool(
  "run_typecheck",
  "Run pnpm typecheck across the workspace and return the output.",
  {},
  async () => {
    try {
      const { stdout, stderr } = await execFileAsync(
        "pnpm",
        ["run", "typecheck"],
        { cwd: WORKSPACE_ROOT, timeout: 60000 },
      );
      return {
        content: [{ type: "text", text: (stdout + stderr).trim() || "Typecheck passed with no output." }],
      };
    } catch (err: unknown) {
      const e = err as { stdout?: string; stderr?: string; message?: string };
      return {
        content: [{ type: "text", text: `Typecheck failed:\n${e.stdout ?? ""}\n${e.stderr ?? ""}\n${e.message ?? ""}` }],
      };
    }
  },
);

mcpServer.tool(
  "install_deps",
  "Run pnpm install in the workspace to install new dependencies.",
  {},
  async () => {
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), 120000);
    try {
      const { stdout, stderr } = await execFileAsync(
        "pnpm",
        ["install"],
        { cwd: WORKSPACE_ROOT, signal: ac.signal, timeout: 120000 },
      );
      return { content: [{ type: "text", text: (stdout + stderr).trim() }] };
    } catch (err: unknown) {
      const e = err as { stdout?: string; stderr?: string; message?: string };
      return {
        content: [{ type: "text", text: `Install failed:\n${e.stdout ?? ""}\n${e.stderr ?? ""}\n${e.message ?? ""}` }],
      };
    } finally {
      clearTimeout(timer);
    }
  },
);

export function validateConfig(): void {
  if (!process.env["MCP_API_KEY"]) {
    console.warn(
      "Warning: MCP_API_KEY environment variable is not set. MCP endpoints will be disabled.",
    );
  }
}

export const mcpAuthMiddleware: RequestHandler = (req, res, next) => {
  const apiKey = process.env["MCP_API_KEY"];
  if (!apiKey) {
    res.status(500).json({ error: "MCP_API_KEY not configured on server" });
    return;
  }
  const authHeader = req.headers["authorization"] ?? "";
  const provided = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (provided !== apiKey) {
    res.status(401).json({ error: "Unauthorized: invalid or missing API key" });
    return;
  }
  next();
};

export const mcpHandler: RequestHandler = async (req, res) => {
  try {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });
    await mcpServer.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (err) {
    req.log.error({ err }, "MCP request failed");
    if (!res.headersSent) {
      res.status(500).json({ error: "MCP request failed" });
    }
  }
};
