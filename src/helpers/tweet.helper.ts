import {THashTag, TParams} from "../api/tweets/tweets.types";
import {TweetsLogger} from "../api/tweets/tweets.logger";

export class TweetHelper {
    public static getValidatedHashtag(params: TParams): THashTag {
        let hashtag = params.hashtag;

        if (hashtag.includes(" ")) {
            hashtag = hashtag.split(" ").join("");
        }
        if (hashtag.match(/[.,\/!$%\^&\*;:{}=\-_`~()]/g)) {
            TweetsLogger.hashtagValidationError(hashtag);
        }
        if (hashtag[0] === "#") {
            return hashtag;
        }
        return "#".concat(hashtag);
    }
}
