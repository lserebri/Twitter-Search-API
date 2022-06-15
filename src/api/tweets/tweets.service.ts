import {twitter} from "../../connections/twitter";
import {ITweet, THashTag, TParams} from "./tweets.types";
import {client} from "../../connections/redis";

export function getValidatedHashtag(params: TParams): THashTag {
    let hashtag = params.hashtag;

    if (hashtag.includes(" ")) {
        hashtag = hashtag.split(" ").join("");
    }
    if (hashtag.match(/[.,\/!$%\^&\*;:{}=\-_`~()]/g)) {
        console.error("Property hashtag should not contain punctuation symbols");
    }
    if (hashtag[0] === "#") {
        return hashtag;
    }
    return "#".concat(hashtag);
}

export async function addToCache(tweetId: string, tweetData: ITweet): Promise<ITweet> {
    const data = await client.get(tweetId);

    if (!data) {
        await client.setEx(tweetId, 3600, JSON.stringify(tweetData));
        return tweetData;
    }
    return JSON.parse(data);
}

export async function getTwitsByHashtag(hashtag: THashTag): Promise<ITweet[] | undefined> {
    try {
        const data = await twitter.v2.search(`${hashtag}`, {
            'tweet.fields': ['id', 'text', 'created_at', 'author_id', "public_metrics"],
            'user.fields': ['username', 'profile_image_url', 'name'],
            'sort_order': 'recency',
            'expansions': "author_id",
            'max_results': 100,
        });

        const tweetsData = data.tweets;
        const usersData = data.includes.users;

        if (!tweetsData) {
            console.error(`There is no tweets found for ${hashtag} hashtag`)
        }

        const res = tweetsData.map(async (v, i) => {
            return addToCache(v.id, {
                "id": v?.id ?? "",
                "text": v?.text ?? "",
                "username": usersData?.[i]?.username ?? "",
                "userScreenName": usersData?.[i]?.name ?? "",
                "userImage": usersData?.[i]?.profile_image_url ?? "",
                "date": v?.created_at ?? "",
                "likes": v?.public_metrics?.like_count,
                "retweetCount": v?.public_metrics?.retweet_count,
            });
        });

        return await Promise.all(res);
    } catch (error) {
        console.error(error);
    }
}
