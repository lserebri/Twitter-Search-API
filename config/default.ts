module.exports = {
    app: {
        port: process.env.NODE_PORT,
    },
    redis: {
        port: process.env.REDIS_PORT,
        lifeTimeCache: process.env.REDIS_LIFETIME_CACHE,
    },
    apis: {
        twitter: {
            bearerToken: process.env.BEARER_TOKEN,
        }
    }
}
