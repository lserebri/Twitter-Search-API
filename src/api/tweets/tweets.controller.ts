import {Router} from 'express'
import {Tweet} from "./tweets.service";
import {TweetHelper} from "../../helpers/tweet.helper";

export const tweetsRouter = Router();

tweetsRouter.get('/:hashtag', async (req, res) => {
    try {
        const data = await Tweet.getTweetsByHashtag(TweetHelper.getValidatedHashtag(req.params))
        res.status(200).send(data);
    }
    catch (error) {
        console.error(error);
    }
})
