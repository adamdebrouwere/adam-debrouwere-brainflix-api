import express from "express"
import videoRoutes from './routes/videos.js'

const app = express();
const PORT = process.env.PORT;

app.use('/', videoRoutes);
// app.get('/', (req, res) => {
//     res.send('Welcome to API')
// });

app.listen(PORT, () => {
    console.log('Listening on port:', PORT);
});
