import cors from 'cors';
import dotenv from "dotenv";
import express from "express"
import videoRoutes from './routes/videos.js'

dotenv.config()

const app = express();
const PORT = process.env.PORT || 8080

app.use(cors());

app.use('/', videoRoutes);

app.listen(PORT, () => {
    console.log('Listening on port:', PORT);
});
