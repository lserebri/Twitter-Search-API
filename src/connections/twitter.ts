import { TwitterApi } from 'twitter-api-v2'
const config = require("config")

export const twitter = new TwitterApi(config.get('apis.twitter.bearerToken'))
