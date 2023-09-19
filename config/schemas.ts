import { z } from "zod";

export const TokenType = z.object({
  _id: z.string(),
  date: z.date(),
});

export const UserType = z.object({
  _id: z.string(),
  token: TokenType,
  username: z.string().max(20),
  password: z.string(),
  friends: z.array(z.string()),
  notes: z.array(z.string()),
  bookmarks: z.array(z.string()),
});

export const NoteType = z.object({
  _id: z.string(),
});

export const BookmarkType = z.object({
  _id: z.string(),
});
