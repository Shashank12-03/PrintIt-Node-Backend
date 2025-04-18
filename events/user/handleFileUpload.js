const fileUpload = require('../../controllers/user/fileUpload.js');

function handleFileupload(socket,io,redisClient) {
    socket.on('sendFile',async (data) => {
        // console.log(data);
        fileUpload(socket, io, redisClient, data);
    });
}

module.exports = handleFileupload;
