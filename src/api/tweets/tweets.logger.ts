export class TweetsLogger {
    public static cacheSaved(hashtag: string, length: number) {
        console.log(`${length} tweets were successfully cached by the '${hashtag}' hashtag`);
    }

    public static cacheReceived(hashtag: string, length: number) {
        console.log(`${length} tweets by the '${hashtag}' hashtag were successfully received from cache`);
    }

    public static hashtagValidationError(hashtag: string) {
        console.error(`Property ${hashtag} should not contain any punctuation symbols`);
    }

    public static dataNotFound(hashtag: string) {
        console.error(`There is no tweets found for ${hashtag} hashtag`);
    }
}
