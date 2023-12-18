import express, { Express } from "express";
import dotenv from "dotenv";
import { openai } from "../index"; // check import for openai
import { sendText, sendCode } from "../controllers/openai";

dotenv.config();

const openaiRoutes = express.Router();

openaiRoutes.post("/text", sendText);
openaiRoutes.post("/code", sendCode);

export default openaiRoutes;