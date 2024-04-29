import fs from "fs";
import path from "path";

class VideoService {
	videoFilePath: string = path.join(__dirname, "../video");

	async getVideoFiles(): Promise<string[]> {
		const videoFiles = await fs.promises.readdir(
			this.videoFilePath
		);
		console.log(videoFiles);
		return videoFiles.filter((file) => file.endsWith(".mp4"));
	}

	generateVideoPage(videoFiles: string[]): string {
		let html = "<ul>";
		videoFiles.forEach((videoFile) => {
			html += `<li><a href="/video/${videoFile}">${videoFile}</a></li>`;
		});
		html += "</ul>";
		return html;
	}

	async getVideoFilePath(videoId: string): Promise<string> {
		const videoFilePath = path.join(
			this.videoFilePath,
			`${videoId}`
		);
		await fs.promises.access(videoFilePath);
		return videoFilePath;
	}
}

export { VideoService };
