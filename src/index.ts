import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import OpenAI from 'openai';
// import {Configuration, OpenAIApi} from "openi";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(helmet());

// allow access from different servers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb"})); // extended: true
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/* openAI configuration */
export const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY, // defaults to process.env["OPENAI_API_KEY"]
});

// const configuration = new Configuration({
//     apiKey: process.env.OPEN_AI_KEY, // defaults to process.env["OPENAI_API_KEY"]

// });
// export const openai = new OpenAIApi(configuration);


const port = process.env.PORT || 9090;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});