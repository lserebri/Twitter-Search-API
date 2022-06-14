import {Router} from 'express'
import {getTwitsByHashtag, getValidatedHashtag} from "./tweets.service";

export const tweetsRouter = Router();

tweetsRouter.get('/:hashtag', async (req, res) => {
    const data = await getTwitsByHashtag(getValidatedHashtag(req.params))

    res.status(200).send(data);
})
