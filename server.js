import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import videoRoutes from "./routes/videos.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const API_KEY = process.env.API_KEY;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  if (req.query.api_key !== API_KEY || !req.query.api_key) {
    return res.status(401).send("You must provide a valid API key.");
  }
  next();
});

app.use("/videos", videoRoutes);
app.use(express.static(path.join(process.cwd(), 'public')));

app.listen(PORT, () => {
  console.log("Listening on port:", PORT);
});
