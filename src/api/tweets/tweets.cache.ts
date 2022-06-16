import {client} from "../../connections/redis";
import {ITweet} from "./tweets.types";
import {Tweet} from "./tweets.service";
import {TweetsLogger} from "./tweets.logger";

const config = require("config");

export class TweetsCache {
    private static readonly lifeTimeCache = config.get('redis.lifeTimeCache');

    private static async isExist(id: string): Promise<boolean> {
        return !!await client.exists(id);
    }

    private static async add(id: string, data: ITweet): Promise<ITweet> {
        await client.setEx(id, this.lifeTimeCache, JSON.stringify(data));
        TweetsLogger.cacheSaved(id)
        return data;
    }

    private static async get(id: string): Promise<ITweet> {
        const data = await client.get(id);
        TweetsLogger.cacheReceived(id)
        return JSON.parse(data || "");
    }

    public static async addToCache(tweet: Tweet): Promise<ITweet> {
        return await this.isExist(tweet.tweetId) ? this.get(tweet.tweetId) : this.add(tweet.tweetId, tweet.tweetData);
    }
}
