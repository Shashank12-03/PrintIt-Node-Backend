const redis = require('redis');
const url = require('node:url');

const REDIS_HOST = process.env.REDIS_HOST
const REDIS_PASSWORD=process.env.REDIS_PASSWORD
const redisUrl = url.parse(REDIS_HOST);

console.log(redisUrl);
console.log(REDIS_PASSWORD);

const redisClient = redis.createClient({
    socket:{
        host:redisUrl.hostname,
        port:redisUrl.port,
    },
    password:REDIS_PASSWORD
})

redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
    console.log('Redis client connected');
});

redisClient.on('ready', () => {
    console.log('Redis client ready to use');
});

redisClient.on('end', () => {
    console.log('Redis client disconnected');
});

module.exports = redisClient;