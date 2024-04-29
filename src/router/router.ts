import express, { Request, Response } from "express";
import { VideoService } from "../service/videoService";
import jwt from "jsonwebtoken";

const router = express.Router();
const videoService = new VideoService();

router.post("/", async (req: Request, res: Response) => {
  console.log("Request to '/' ");
  const { email, password } = req.body;
  if (email === "admin" && password == "admin") {
    const token = jwt.sign(
      { email },
      process.env.SECRET_KEY || "default_secret_key",
      { expiresIn: "6h" },
    );
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

router.get("/videos", async (req: Request, res: Response) => {
  try {
    const videoFiles = await videoService.getVideoFiles();
    const html = videoService.generateVideoPage(videoFiles);
    res.send(html);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const videoId = req.params.id;
  try {
    const videoFilePath = await videoService.getVideoFilePath(videoId);
    res.sendFile(videoFilePath);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

export { router };
