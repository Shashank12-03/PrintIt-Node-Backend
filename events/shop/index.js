const handleJoin = require('./handleJoin.js');
// const handleUser = require('./getUser.js');
// const handleDisconnect = require('./disconnect.js');

function setSocketEventsForShop(socket,redisClient) {
    handleJoin(socket,redisClient);
    // handleDisconnect(socket,redisClient);
}

module.exports = setSocketEventsForShop;