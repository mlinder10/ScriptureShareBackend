import axios from "axios";

export const instanceAPI = axios.create({
    headers: { "api-key": process.env.BIBLE_API_KEY },
    baseURL: process.env.BIBLE_URL,
  });