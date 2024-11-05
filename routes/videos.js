import express from 'express';
const router = express.Router();

router.get("/videos", (req, res) => {
    res.send("this is my router")
})
export default router;