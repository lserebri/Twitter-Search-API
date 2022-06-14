# TwitterAPI

#### Notes:
- Required files: `.env` file
- Required installation: npm, node, redis-server.
- Node Version: `v18.3.0`
- Install node dependencies: `npm install`
- To test dev version: `npm run build-prod` and `npm run prod`
- To build development version: (`npm run dev`)
- Port: `3000`
- Redis Client Port: `6379`

#### Description:
Express.js + NodeJS based application. The primary purpose is to get parsed information from [Twitter API v2]([url](https://developer.twitter.com/en/docs/twitter-api))

#### API Endpoints:
TwitterAPI
- GET: `/tweets/:hashtag`
