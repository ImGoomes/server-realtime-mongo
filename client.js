const io = require('socket.io-client');

const socket = io.connect(`http://localhost:3000`); // **[A]**

socket.on("connect", () => {
    console.log(`[CLIENT_SOCKET_IO] Connected:`, socket.connected)
})

socket.on("changeData", payload => { // **[B]**
    console.log(`[CLIENT_CHANGE_STREAM] User:`, payload)
})