import express from 'express';
import fs from 'fs';
const router = express.Router();

router.get("/videos", (req, res) => {
    fs.readFile("data/videos.json", "utf8", (err, data) => {
        if (err) {
            console.error("Error reading data from file:", err)
            return res.status(500).json({
                error: "Error reading file",
            });
        }

        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (err) {
            console.error("Error parsing data:", err)
            res.status(500).json({
                error: 'Error parsing data'
            })
        }
    })
});

router.get("/videos/:id", (req, res) => {
    res.send("this is to get videos by thier id's")
});

export default router;