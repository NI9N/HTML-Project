import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { type RequestHandler } from "express";

function createMcpServer(): McpServer {
  const server = new McpServer({
    name: "replit-api-server",
    version: "1.0.0",
  });

  server.tool(
    "ping",
    "Returns pong — use this to verify the MCP connection is working",
    {},
    async () => ({
      content: [{ type: "text", text: "pong" }],
    }),
  );

  server.tool(
    "server_info",
    "Returns information about this Replit API server",
    {},
    async () => ({
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              name: "Replit API Server",
              version: "1.0.0",
              transport: "streamable-http",
              endpoints: {
                healthz: "/api/healthz",
                mcp: "/api/mcp",
              },
            },
            null,
            2,
          ),
        },
      ],
    }),
  );

  return server;
}

export const mcpHandler: RequestHandler = async (req, res) => {
  try {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });
    const server = createMcpServer();
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (err) {
    req.log.error({ err }, "MCP request failed");
    if (!res.headersSent) {
      res.status(500).json({ error: "MCP request failed" });
    }
  }
};
