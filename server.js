const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const multer = require('multer');
const redisClient = require('./connect.js');
const cors = require('cors');
const setSocketEventsForUser = require('./events/user/index.js');
const setSocketEventsForShop = require('./events/shop/index.js');



require('dotenv').config();
const PORT = process.env.PORT;
console.log(PORT);

const coreOption = {
    origin:"*",
    method:["GET","POST","PATCH","DELETE","PUT"],
    allowHeaders:['Content-Type','Authorization'],
    credentials:true,
}

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    }
});



// redis connection
redisClient.connect()
.then(()=> console.log('redis connected'))
.catch((err)=> console.log("error occured connecting redis: ",err));


// middleware
app.use(cors(coreOption));
app.use(express.json());


io.on("connection",(socket)=>{
    const userType = socket.handshake.query.userType; 
    console.log('connection setup with ',userType);
    if (userType === "user") { 
        console.log('user');
        setSocketEventsForUser(socket,io, redisClient);
    } else if (userType === "shop") {
        setSocketEventsForShop(socket, redisClient);
    } else {
        console.error('Unknown user type:', userType);
        socket.disconnect();
    }

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
})

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});