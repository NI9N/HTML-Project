import { readFileSync } from "fs";
import axios from "axios";

const API_KEY = process.env.OPENROUTER_API_KEY;
const API_BASE = "https://openrouter.ai/api/v1";

async function analyze(imagePath, prompt) {
  const data = readFileSync(imagePath);
  const b64 = data.toString("base64");

  const resp = await axios.post(
    `${API_BASE}/chat/completions`,
    {
      model: "qwen-vl-plus",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: `data:image/png;base64,${b64}` } },
          ],
        },
      ],
      max_tokens: 2000,
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "HTTP-Referer": "https://claude.ai",
        "X-Title": "Restaurant Design Analysis",
      },
      timeout: 60000,
    }
  );

  return resp.data.choices?.[0]?.message?.content || "无结果";
}

const [,, ...args] = process.argv;
if (args.length < 2) {
  console.error("用法: node analyze.js <图片路径> <prompt>");
  process.exit(1);
}

const imagePath = args[0];
const prompt = args.slice(1).join(" ");

analyze(imagePath, prompt)
  .then((result) => console.log(result))
  .catch((err) => {
    console.error("错误:", err.response?.data?.error?.message || err.message);
    process.exit(1);
  });
