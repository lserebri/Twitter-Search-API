import {twitter} from "../../connections/twitter";
import {ITweet, THashTag} from "./tweets.types";
import {TweetsCache} from "./tweets.cache";
import {TweetsLogger} from "./tweets.logger";

export class Tweet {
    public static async getTweetsByHashtag(hashtag: THashTag): Promise<ITweet[]> {
        const dataFromCache = await TweetsCache.getCacheIfExist(hashtag)

        if (dataFromCache) {
            return dataFromCache;
        }

        const twitterAPIResponse = await twitter.v2.search(`${hashtag}`, {
            'tweet.fields': ['id', 'text', 'created_at', 'author_id', "public_metrics"],
            'user.fields': ['username', 'profile_image_url', 'name'],
            'sort_order': 'recency',
            'expansions': "author_id",
            'max_results': 100,
        });

        const [tweetsData, usersData] = [twitterAPIResponse.tweets, twitterAPIResponse.includes.users];

        if (!tweetsData.length) {
            TweetsLogger.dataNotFound(hashtag);
        }

        const res = TweetsCache.add(
            hashtag,
            tweetsData.map((v, i) => {
                return {
                    "id": v?.id,
                    "text": v?.text,
                    "username": usersData?.[i]?.username ?? "",
                    "userScreenName": usersData?.[i]?.name ?? "",
                    "userImage": usersData?.[i]?.profile_image_url ?? "",
                    "date": v?.created_at,
                    "likes": v?.public_metrics?.like_count,
                    "retweetCount": v?.public_metrics?.retweet_count,
                }
            })
        )
        return await Promise.resolve(res);
    }
}
