import { Router } from "express";
import { tweetsRouter } from "./tweets/tweets.controller"

const router = Router();

router.use("/tweets", tweetsRouter);

module.exports = router;
