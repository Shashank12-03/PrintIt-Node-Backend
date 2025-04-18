const joinUser = require('../../controllers/user/joinUser.js');

function handleJoin(socket,redisClient) {
    socket.on("join", (data)=>{
        joinUser(socket,data,redisClient);
    });
}

module.exports = handleJoin;