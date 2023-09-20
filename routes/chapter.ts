import express from "express";
import axios from "axios";
import cheerio from "cheerio";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { bible, chapter } = req.query;
    const response = await axios.get(
      `https://api.scripture.api.bible/v1/bibles/${bible}/chapters/${chapter}?content-type=html&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false`,
      { headers: { "api-key": process.env.BIBLE_API_KEY } }
    );
    const $ = cheerio.load(response.data.data.content);
    const plainText = $("p.p")
      .map((_, element) => $(element).text())
      .get()
      .join(" ")
      .replace("¶", "");
    const linesArray = plainText.split(/\d/).filter(line => line.trim() !== "");

    return res.status(200).json({
      content: linesArray,
      next: response.data.data.next.id,
      previous: response.data.data.previous.id,
    });
  } catch (err: any) {
    console.error(err?.message);
    return res.status(500).json({ message: "Internal service error" });
  }
});

export default router;
