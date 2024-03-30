import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.get( '/', (req, res) => {
				res.sendFile(__dirname);
});

//app.get
app.get('/video', (req, res) => {
const range = req.headers.range;

const videoPath = ('/video/Iron.Man.mp4');

const videoSize = fs.statSync('/video/Iron.Man.mp4').size;
const CHUNK_SIZE = 10 ** 6;
const start = Number(range?.replace(\/D/,""));
const end = Math.min(start + CHUNK_SIZE, videoSize -1);
const contentLength = end - start +1;
const headers = {  "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };

		res.writeHead(206, headers);
		const videoStream = fs.createReadStream(videoPath, {start, end});
		videoStream.pipe(res);
});


app.listen(PORT, () => {	
				console.log(`[server]: Server is running at localhost:${PORT}`);

});
