const joinShop = require('../../controllers/shop/joinShop.js');

function handleJoin(socket,redisClient) {
    socket.on("join", (data)=>{
        joinShop(socket,data,redisClient);
    });
}

module.exports = handleJoin;