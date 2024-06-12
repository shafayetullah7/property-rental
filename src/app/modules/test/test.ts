import express from "express";

const testRouter = express.Router();

testRouter.get("/test", (req, res) => {
  return res.status(200).json({ haha: "haha" });
});

export default testRouter;
