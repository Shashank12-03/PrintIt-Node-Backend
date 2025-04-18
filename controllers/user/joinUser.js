const {getUser} = require('../../apis/verify.js');

async function joinUser(socket,data,redisClient) {
    
    console.log(data);
    
    try {
        const token = data.token;
        const type = data.userType;
        if (type==='user') {
            console.log('entered user');
            const userData = await getUser(token);
            console.log(userData);
            const user = userData.user;
            if (!user) {
                return socket.emit('error',{'message':'user not found'});
            }
            const id = user.id;
            console.log(id);
            console.log(`connection established ${socket.id}`);
            const key = `userSocket_${id}`;
            const socketId = socket.id;
            await redisClient.set(key,socketId);
            socket.user = user;
            console.log(`user onnected with socket id ${socketId}`);
            return socket.emit("join_success", { message: "user connected to shop on socket id",user});
        }
    } catch (error) {
        console.error("Error during join event:", error.message);
        return socket.emit("join_failure", { message: "error occured", 'error':error.message});
    }
}

module.exports = joinUser;