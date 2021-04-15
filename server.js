const express = require("express");
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
const server = require("http").Server(app);
const io = require("socket.io")(server);
console.log("Server Success..!");

server.listen(3000);

const arrayList = []
let maduthuong = ""

io.on("connection", function (socket) {

    console.log("da nguoi ket noi : " + socket.id)


    socket.on("client_send",function (data){
        arrayList.push(
            new ListLearn(data.name,data.email,data.phone,maduthuong)
        )
        io.sockets.emit("server_send_list",arrayList.reverse() )
    })

    socket.on("client_send_random",function (data){
        console.log("random :", data)
        io.sockets.emit("server_send_random",data)
        maduthuong = data

    })

})


function ListLearn(name, email, phone, madt){
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.madt = madt
}

app.get("/", function (req, res) {
    res.render("trangchu");
})
