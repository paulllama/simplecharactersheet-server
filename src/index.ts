import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

import Models from "./models"

dotenv.config();

const port = process.env.PORT;

const app: Express = express();
app.get("/", (req: Request, res: Response) => {
    res.send(`Express & TypeScript Server - port: ${port}`);
});

const serve = async (): Promise<String | void> => {
    await mongoose.connect(Models.MONGO_CONNECTION_URI)
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}
serve().catch(console.error)
