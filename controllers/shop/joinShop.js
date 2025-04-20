const {getShop} = require('../../apis/verify.js');

async function joinShop(socket,data,redisClient) {
    
    console.log(data);
    
    try {
        const token = data.token;
        const type = data.userType;
        if (type==='shop') {
            console.log('entered shop');
            const data = await getShop(token);
            const shop = data.shop;
            console.log(shop);
            if (!shop) {
                return socket.emit('error',{'message':'shop not found'});
            }
            const id = shop.id;
            const key = `shopSocket_${id}`;
            const socketId = socket.id;
            console.log(socketId);
            await redisClient.set(key,socketId);
            console.log(`shop onnected with socket id ${socketId}`);
            socket.user = shop;
            return socket.emit("join_success", { message: "shop connected to server", shop});
        }
    } catch (error) {
        console.error("Error during join event:", error.message);
        return socket.emit("join_failure", { message: "error occured", 'error':error.message});
    }
}

module.exports = joinShop;