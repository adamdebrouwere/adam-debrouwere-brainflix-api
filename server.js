import express from "express"
import videoRoutes from './routes/videos.js'
const app = express();

app.use('/', videoRoutes);
// app.get('/', (req, res) => {
//     res.send('Welcome to API')
// });

app.listen(8080, () => {
    console.log('Listening on port 8080');
});
