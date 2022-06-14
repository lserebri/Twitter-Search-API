import { createClient } from 'redis';

const config = require("config");

const REDIS_PORT = config.get('redis.port') || 6379;

export const client = createClient(REDIS_PORT);

client.on('error', (err: any) => {
    console.error('Error ' + err);
});

async function createConnection() { await client.connect(); }

createConnection();

