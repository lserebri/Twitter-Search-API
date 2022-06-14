export type THashTag = string;
export type TParams = { hashtag: THashTag };

export interface ITweet {
    id: string,
    text: string,
    username: string,
    userScreenName: string,
    userImage?: string,
    date?: string,
    likes?: number,
    retweetCount: number | undefined,
}
