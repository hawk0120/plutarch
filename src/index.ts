import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	const videoFiles = getVideoFiles();
	res.send(generateVideoPage(videoFiles));
});

app.get("/video/:id", (req, res) => {
	const videoId = req.params.id;
	const videoFilePath = path.join(__dirname, `/video/${videoId}`);

	res.sendFile(path.resolve(videoFilePath));
});

function getVideoFiles(): string[] {
	const videoDir = (path.join(__dirname, "/video/"));
	return fs.readdirSync(videoDir).filter((file) => file.endsWith(".mp4"));
}

function generateVideoPage(videoFiles: string[]): string {
	let html = "";
	videoFiles.forEach((videoFile) => {
		html += `<li><a href="/video/${videoFile.toString()}">${videoFile}</a></li>`;
	});
	html += "</ul>";
	return html;
}

app.listen(PORT, () => {
	console.log(`[server]: Server is running at localhost:${PORT}`);
});
