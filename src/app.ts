import 'dotenv/config';
import express from 'express';
import rateLimit from 'express-rate-limit';

const config = require("config");
const cors = require("cors");

const PORT = config.get('app.port') || 3000;

const app = express();

app.use(cors());

app.use(
    rateLimit({
        windowMs: 1 * 60 * 1000, // 15 minutes duration in milliseconds
        max: 450,
        message: "You exceeded 450 requests in 15 minutes limit!",
        headers: true,
    })
);

app.use('/', require('./api/router'));

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})
