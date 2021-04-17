const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const httpServer = require("http").createServer(app);
const options = { /* ... */ };

const io = require("socket.io")(httpServer, options);

console.log("Server Success..!");

httpServer.listen(3000)



// ROUTES FOR OUR API /* Cài đặt router */
// =============================================================================
const router = express.Router();
require('./router/routes')(router,io);
app.use('', router);


