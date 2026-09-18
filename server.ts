import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Google GenAI client lazily or securely
  let aiClient: GoogleGenAI | null = null;
  function getGenAI() {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Chưa cấu hình GEMINI_API_KEY trong Secrets");
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", message: "Phòng thí nghiệm Hóa học 12 sẵn sàng!" });
  });

  // AI Assistant Endpoint for Chemistry Questions
  app.post("/api/ai-assistant", async (req, res) => {
    try {
      const { question, context } = req.body;
      if (!question) {
        return res.status(400).json({ error: "Vui lòng nhập câu hỏi" });
      }

      const ai = getGenAI();

      const systemInstruction = `Bạn là Trợ Lý AI Hóa Học Lớp 12 chuyên nghiệp, thân thiện và nhiệt tình (Chương trình GDPT 2018 - Bài 4: Carbohydrate - Glucose & Fructose).
Nhiệm vụ của bạn là giải thích ngắn gọn, chuẩn xác, dễ hiểu bằng tiếng Việt cho học sinh lớp 12 về:
1. Cấu tạo phân tử (mạch hở, dạng vòng alpha/beta) của Glucose và Fructose.
2. Các phản ứng hóa học (tác dụng Cu(OH)2 nhiệt độ thường & đun nóng, tráng bạc với thuốc thử Tollens, phản ứng với nước bromine, phản ứng lên men, phản ứng tạo methyl glucoside).
3. Hiện tượng thí nghiệm, nguyên nhân hóa học và viết phương trình phản ứng minh họa dạng đầy đủ và thu gọn.
4. Mẹo nhớ nhanh, so sánh phân biệt Glucose vs Fructose.
Khuyên học sinh chú ý an toàn thí nghiệm. Sử dụng định dạng Markdown đẹp mắt, có gạch đầu dòng và công thức hóa học rõ ràng.`;

      const prompt = `[Bối cảnh hiện tại trong ứng dụng thí nghiệm ảo: ${context || "Học sinh đang ở phòng thí nghiệm ảo Carbohydrate"}]

Câu hỏi của học sinh: ${question}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const answer = response.text || "Xin lỗi, giáo viên AI chưa thể trả lời câu hỏi này lúc này.";

      return res.json({ answer });
    } catch (err: any) {
      console.error("AI Assistant Error:", err);
      return res.status(500).json({
        error: "Không thể kết nối với Trợ lý AI Hóa Học.",
        details: err?.message || "Đã xảy ra lỗi hệ thống.",
      });
    }
  });

  // Vite middleware for development or static serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server chemistry app running at http://localhost:${PORT}`);
  });
}

startServer();
