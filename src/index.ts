import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.get( '/', (req, res) => {
				res.send('Express & TypeScript Server');
});

app.listen(PORT, () => {	
				console.log(`[server]: Server is running at localhost:${PORT}`);

});
