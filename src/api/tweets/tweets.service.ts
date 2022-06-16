import {twitter} from "../../connections/twitter";
import {ITweet, THashTag, TParams} from "./tweets.types";
import {TweetsCache} from "./tweets.cache";
import {TweetsLogger} from "./tweets.logger";

export class Tweet {
    get tweetId(): string {
        return this._tweetId;
    }

    get tweetData(): ITweet {
        return this._tweetData;
    }

    constructor(
        private _tweetData: ITweet,
        private _tweetId: string = _tweetData.id
    ) {}

    public static async getTweetsByHashtag(hashtag: THashTag): Promise<ITweet[]> {
        const data = await twitter.v2.search(`${hashtag}`, {
            'tweet.fields': ['id', 'text', 'created_at', 'author_id', "public_metrics"],
            'user.fields': ['username', 'profile_image_url', 'name'],
            'sort_order': 'recency',
            'expansions': "author_id",
            'max_results': 100,
        });

        const [tweetsData, usersData] = [data.tweets, data.includes.users];

        if (!tweetsData.length) {
            TweetsLogger.dataNotFound(hashtag);
        }

        const res = tweetsData.map((v, i) =>
            TweetsCache.addToCache(new Tweet({
                "id": v?.id,
                "text": v?.text,
                "username": usersData?.[i]?.username ?? "",
                "userScreenName": usersData?.[i]?.name ?? "",
                "userImage": usersData?.[i]?.profile_image_url ?? "",
                "date": v?.created_at,
                "likes": v?.public_metrics?.like_count,
                "retweetCount": v?.public_metrics?.retweet_count,
            }))
        );

        return await Promise.all(res);
    }
}
