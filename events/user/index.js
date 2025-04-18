const handleJoin = require('./handleJoin.js');
// const handleUser = require('./getUser.js');
const handleFileupload = require('./handleFileUpload.js');
// const handleDisconnect = require('./disconnect.js');

function setSocketEventsForUser(socket,io,redisClient) {
    handleJoin(socket,redisClient);
    handleFileupload(socket,io,redisClient);
    // handleDisconnect(socket,redisClient);
}

module.exports = setSocketEventsForUser;