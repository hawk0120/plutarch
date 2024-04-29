// app.ts
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { router } from "./router/router";
import cors from 'cors';
import  bodyParser from 'body-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, "public")));
app.use("/", router);

app.listen(PORT, () => {
    console.log(`[server]: Server is running at localhost:${PORT}`);
});

