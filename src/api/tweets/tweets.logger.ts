export class TweetsLogger {
    public static cacheSaved(id: string) {
        console.log(`Tweet ${id} successfully saved to cache`);
    }

    public static cacheReceived(id: string) {
        console.log(`Tweet ${id} successfully received from cache`);
    }

    public static hashtagValidationError(hashtag: string) {
        console.error(`Property ${hashtag} should not contain any punctuation symbols`);
    }

    public static dataNotFound(hashtag: string) {
        console.error(`There is no tweets found for ${hashtag} hashtag`);
    }
}
