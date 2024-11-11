import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.get("/", (req, res) => {
  fs.readFile("data/videos.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading from video data file:", err);
      return res.status(500).json({
        error: "Error reading file of video data",
      });
    }

    try {
      const jsonData = JSON.parse(data);
      if (jsonData) {
        res.json(jsonData);
      }

    } catch (err) {
      console.error("Error parsing or sending video data:", err);
      res.status(500).json({
        error: "Error parsing to get all the video data",
      });
    }
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile("data/videos.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading data from video file:", err);
      return res.status(500).json({
        error: "Error reading file to select video from",
      });
    }

    try {
      const parsedData = JSON.parse(data);
      if (!parsedData) {
        return res.status(404).json({
          error: "Parsing data for chosen video"
        })
      }
      const foundVideo = parsedData.find((video) => video.id === id);

      if (!foundVideo) {
        return res.status(404).json({
          error: "Video not found when searching for selected video",
        });
      }

      res.json(foundVideo);
    } catch (err) {
      console.error(
        "Error parsing data to get selected video information",
        err
      );
      res.status(500).json({
        error: "Error parsing data to get selected video information",
      });
    }
  });
});

router.get("/:id/comments", (req, res) => {
  const { id } = req.params;

  fs.readFile("data/videos.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading data from video file:", err);
      return res.status(500).json({
        error: "Error reading file to select video from",
      });
    }

    try {
      const parsedData = JSON.parse(data);
      const foundVideo = parsedData.find((video) => video.id === id);

      if (!foundVideo) {
        return res.status(404).json({
          error: "Video not found when searching for selected video",
        });
      }

      res.json(foundVideo.comments);
    } catch (err) {
      console.error(
        "Error parsing data to get selected video comments",
        err
      );
      res.status(500).json({
        error: "Error parsing data to get selected video comments",
      });
    }
  });
});

router.post("/upload-video", (req, res) => {
  if (!req.body.title || !req.body.description) {
    return res.status(400).json({
      error: "Title and description are required to post video.",
    });
  }

  const newVideo = {
    id: uuidv4(),
    title: req.body.title,
    channel: "Yours Truly",
    description: req.body.description,
    views: 0,
    likes: 0,
    image: "",
    duration: "00:00",
    video: "",
    timestamp: new Date(),
    comments: [],
  };

  fs.readFile("data/videos.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file", err);
      return res.status(500).json({
        error: "Error reading file for video post",
      });
    }

    try {
      let parsedVideos = JSON.parse(data);
      if (parsedVideos) {
        parsedVideos.push(newVideo);
      } else {
        return res.status(500).json({
          error: "Error pushing new video to parsed videos."
        })
      }
      
      fs.writeFile(
        "data/videos.json",
        JSON.stringify(parsedVideos, null, 2),
        "utf8",
        (err) => {
          if (err) {
            console.error("Error writing data to file for video post:", err);
            return res.status(500).json({
              error: "Error writing file",
            });
          }

          res.status(200).json({
            message: "Successful video post",
            video: newVideo,
          });
        }
      );
    } catch (err) {
      console.error("Error parsing data to post video to:", err);
      res.status(500).json({
        error: "Error parsing data",
      });
    }
  });
});

router.post("/comment/:id", (req, res) => {
  
  if (!req.body.comment) {
    return res.status(400).json({
      error: "Input is required to comment... ",
    });
  }
  
  const newComment = {
    id: uuidv4(),
    name: "Hello You",
    comment: req.body.comment,
    likes: 0,
    timestamp: Date.now(),
  };
      
  fs.readFile("data/videos.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file to upload comment to", err);
      return res.status(500).json({
        error: "error reading file to upload comment to",
      });
    }
    
    try {
      const { id } = req.params;
      const parsedVideos = JSON.parse(data);
      const foundVideo = parsedVideos.find((video) => video.id === id);
      
      if (!foundVideo) {
        return res.status(404).json({
          error: "Video not found",
        });
      }
      
      foundVideo.comments.push(newComment);

      fs.writeFile(
        "data/videos.json",
        JSON.stringify(parsedVideos, null, 2),
        "utf8",
        (err) => {
          if (err) {
            console.error("Error writing data for comment upload:", err);
            return res.status(500).json({
              error: "Error writing file",
            });
          }

          res.status(200).json({
            message: "Successful comment upload",
            comment: newComment,
          });
        }
      );
    } catch (err) {
      console.error("Error parsing data for comment upload:", err);
      res.status(500).json({
        error: "Error parsing data for comment upload",
      });
    }
  });
});

export default router;
