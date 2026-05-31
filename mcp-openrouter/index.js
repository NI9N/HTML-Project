#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";
import { readFileSync } from "fs";
import path from "path";

const API_KEY = process.env.OPENROUTER_API_KEY;
const API_BASE = "https://openrouter.ai/api/v1";

function imageToBase64(filePath) {
  const data = readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const mime = ext === ".png" ? "image/png"
    : ext === ".jpg" || ext === ".jpeg" ? "image/jpeg"
    : ext === ".webp" ? "image/webp"
    : ext === ".gif" ? "image/gif"
    : "image/png";
  return { mime, data: data.toString("base64") };
}

const server = new Server(
  { name: "mcp-openrouter", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "describe_image",
      description: "分析图片内容：识别菜品、装修风格、颜色色调、文字等。使用 OpenRouter 视觉模型。",
      inputSchema: {
        type: "object",
        properties: {
          image_path: { type: "string", description: "图片的绝对路径" },
          prompt: { type: "string", description: "分析指令，如 '描述这个餐厅的装修风格和色调'，默认为 '请详细描述这张图片的内容'", default: "请详细描述这张图片的内容" },
          model: { type: "string", description: "视觉模型，默认为 nvidia/nemotron-nano-12b-v2-vl (免费)", default: "nvidia/nemotron-nano-12b-v2-vl:free" }
        },
        required: ["image_path"]
      }
    },
    {
      name: "extract_text_from_image",
      description: "从图片中提取文字（OCR），适合读取菜单、招牌等。",
      inputSchema: {
        type: "object",
        properties: {
          image_path: { type: "string", description: "图片的绝对路径" },
          prompt: { type: "string", description: "提取指令", default: "请提取这张图片中所有可见的文字内容，保持原始格式和顺序" },
          model: { type: "string", description: "视觉模型，默认为 nvidia/nemotron-nano-12b-v2-vl (免费)", default: "nvidia/nemotron-nano-12b-v2-vl:free" }
        },
        required: ["image_path"]
      }
    },
    {
      name: "analyze_design_style",
      description: "分析餐厅/空间设计的风格、色调、材质和氛围。输出格式化报告。",
      inputSchema: {
        type: "object",
        properties: {
          image_path: { type: "string", description: "餐厅装修/环境照片的绝对路径" },
          model: { type: "string", description: "视觉模型，默认为 nvidia/nemotron-nano-12b-v2-vl (免费)", default: "nvidia/nemotron-nano-12b-v2-vl:free" }
        },
        required: ["image_path"]
      }
    }
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (!API_KEY) {
    return {
      content: [{ type: "text", text: "错误：未设置 OPENROUTER_API_KEY 环境变量" }],
      isError: true,
    };
  }

  let userPrompt = args.prompt;
  const imagePath = args.image_path;
  const model = args.model || "nvidia/nemotron-nano-12b-v2-vl:free";

  try {
    const { mime, data } = imageToBase64(imagePath);

    // Build system & user prompts based on tool name
    if (name === "analyze_design_style") {
      userPrompt = `你是一个专业的餐厅室内设计师。请仔细分析这张餐厅照片，输出结构化报告：

1. 设计风格（如：工业风/北欧/中式/日式/混搭等）
2. 主色调（列出3-5个主要颜色及其 HEX 色值）
3. 材质（如：原木/混凝土/金属/玻璃等）
4. 灯光氛围（色温、亮度、灯具类型）
5. 空间布局（桌椅排列、动线感受）
6. 整体氛围关键词（3-5个词）
7. 设计参考建议（这种风格适合搭配什么字体、装饰元素）`;
    } else if (name === "extract_text_from_image" && !userPrompt) {
      userPrompt = "请提取这张图片中所有可见的文字内容，保持原始格式和顺序";
    }

    const response = await axios.post(
      `${API_BASE}/chat/completions`,
      {
        model: model,
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: userPrompt },
              { type: "image_url", image_url: { url: `data:${mime};base64,${data}` } }
            ]
          }
        ],
        max_tokens: 2000,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "HTTP-Referer": "https://claude.ai",
          "X-Title": "Restaurant Website MCP",
        },
        timeout: 60000,
      }
    );

    const text = response.data.choices?.[0]?.message?.content || "无返回结果";

    return { content: [{ type: "text", text }] };
  } catch (err) {
    const errorMsg = err.response?.data?.error?.message || err.message;
    return {
      content: [{ type: "text", text: `调用失败: ${errorMsg}` }],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
