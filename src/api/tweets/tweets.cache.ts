import {client} from "../../connections/redis";
import {ITweet} from "./tweets.types";
import {TweetsLogger} from "./tweets.logger";

const config = require("config");

export class TweetsCache {
    private static readonly lifeTimeCache = config.get('redis.lifeTimeCache');

    private static async isExist(hashtag: string): Promise<boolean> {
        return !!await client.exists(hashtag);
    }

    public static async getCacheIfExist(hashtag: string): Promise<ITweet[] | null> {
        return await this.isExist(hashtag) ? this.get(hashtag) : null
    }

    public static async add(hashtag: string, data: ITweet[]): Promise<ITweet[]> {
        await client.setEx(hashtag, this.lifeTimeCache, JSON.stringify(data));

        TweetsLogger.cacheSaved(hashtag, data.length)
        return data;
    }

    public static async get(hashtag: string): Promise<ITweet[]> {
        const data = await client.get(hashtag);

        TweetsLogger.cacheReceived(hashtag, data?.length || 0)
        return JSON.parse(data || "");
    }
}
