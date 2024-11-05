import cors from 'cors';
import dotenv from "dotenv";
import express from "express"
import videoRoutes from './routes/videos.js'

dotenv.config()

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use('/', videoRoutes);
// app.get('/', (req, res) => {
//     res.send('Welcome to API')
// });

app.listen(PORT, () => {
    console.log('Listening on port:', PORT);
});
