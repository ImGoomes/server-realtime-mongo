const http = require("http");
const serverSocketIO = require("socket.io");
const mongoose = require("mongoose");

//
// default env vars
//
const {
    // **[A]**
    MONGODB_URL = "mongodb+srv://<user>:<password>@senergy-iot.k0afa.mongodb.net/UserDB?retryWrites=true&w=majority",
        SERVER_HOST = "localhost",
        SERVER_PORT = 3000
} = process.env;

//
// mongoose models
//
const User = require("./models");

//
// http server and socket.io socket
//
const server = http.createServer((req, res) => {
    res.end("Olá mundo!");
});
const serverIO = serverSocketIO(server); // **[B]**

//
// starting server and db conn
//
mongoose.connect(
    MONGODB_URL, { useNewUrlParser: true },
    err => {
        if (err) {
            console.log(`[SERVER_ERROR] MongoDB Connection:`, err);
            process.exit(1);
        }

        // **[C]**
        User.watch().on("change", change => {
            console.log(`[SERVER_CHANGE_STREAM] User:`, change);
            serverIO.emit("changeData", change);
        });

        serverIO.on("connection", function(client) {
            console.log("[SERVER_SOCKET_IO] New Connection:", client.id);
        });

        server.listen(SERVER_PORT, SERVER_HOST, () => {
            console.log(`[SERVER] Running at ${SERVER_HOST}:${SERVER_PORT}`);
        });
    }
);