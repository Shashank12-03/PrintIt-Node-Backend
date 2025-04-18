
async function fileUpload(socket, io, redisClient,data) {
    try {
        const {file, fileName, shopId, userId, message} = data;
        const key = `shopSocket_${shopId}`;
        const socketId = await redisClient.get(key);
        if (!socketId) {
            console.log('shop not connected');
            return socket.emit('error',{'message':'shop is offline'});
        }
        
        console.log(socketId);
        // const fileKey = `userFile_${fileName}_${Date.now}`;
        // await redisClient.set(fileKey,JSON.stringify({fileName, file, message}));
        // await redisClient.expire(fileKey,900);
        
        io.to(socketId).emit('file_received',{
            fileName,
            file,
            message,
            userId,
            userSocket:socket.id,
            fileKey
        });

        return socket.emit('sent',{'message':'file sent to the shop'});
    } catch (error) {
        console.log(error.message);
        return socket.emit('error',{'error':error.message});
    }
}

module.exports = fileUpload;