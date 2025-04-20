
async function fileUpload(socket, io, redisClient,data) {
    try {
        const {file, fileName, shopId, user, message} = data;
        console.log(fileName, shopId, user, message);
        const key = `shopSocket_${shopId}`;
        const socketId = await redisClient.get(key);
        if (!socketId) {
            console.log('shop not connected');
            return socket.emit('error',{'message':'shop is offline'});
        }
        
        // const fileKey = `userFile_${fileName}_${Date.now}`;
        // await redisClient.set(fileKey,JSON.stringify({fileName, file, message}));
        // await redisClient.expire(fileKey,900);
        console.log('socketId', socketId);
        const files = {fileName,file,message}
        io.to(socketId).emit('file_received',{
            files,
            sender:user
        });

        return socket.emit('sent',{'message':'file sent to the shop'});
    } catch (error) {
        console.log(error.message);
        return socket.emit('error',{'error':error.message});
    }
}

module.exports = fileUpload;