import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { bible, chapter } = req.query;
    const response = await axios.get(
      `https://api.scripture.api.bible/v1/bibles/${bible}/chapters/${chapter}?content-type=text&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false`,
      { headers: { "api-key": process.env.BIBLE_API_KEY } }
    );
    let verseNumber = 1;
    const stringParagraphs = response.data.data.content.split("\n");
    let verseParagraphs: any = [];
    for (const paragraph of stringParagraphs) {
      const verses = paragraph
        .split(/\[\d{1,2}\]/)
        .filter((v: string) => v !== "     ")
        .map((v: string) => (v = `[${verseNumber++}]` + v));
      verseParagraphs.push(verses);
    }

    return res.status(200).json({
      content: verseParagraphs,
      next: response.data.data.next.id,
      previous: response.data.data.previous.id,
    });
  } catch (err: any) {
    console.error(err?.message);
    return res.status(500).json({ message: "Internal service error" });
  }
});

export default router;
