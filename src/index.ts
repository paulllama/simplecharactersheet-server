import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const mongoUsername: string = process.env.MONGODB_USERNAME || '';
const mongoPassword: string = process.env.MONGODB_PASSWORD || '';
const mongoCluserUri: string = process.env.MONGODB_CLUSTER_URI || '';
const mongoConnectionUri: string = 
    `mongodb+srv://${mongoUsername}:${mongoPassword}@${mongoCluserUri}/?retryWrites=true&w=majority&appName=simplecharactersheet`
await mongoose.connect(mongoConnectionUri)

app.get("/", (req: Request, res: Response) => {
  res.send(`Express & TypeScript Server - port: ${port}`);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});