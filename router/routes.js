
const fun_table_realtime_firebase = require("../funtion/fun_Table_Realtime_Firebase")
const firebase = require("firebase")
const arrayList = []
let voucher = ""
module.exports = (router, io) => {

    // on() once() method firebase
    firebase.database().ref('danhsachduthuong').once('value',   function(data) {
        data.forEach(function(keyval) {
            let childKey = keyval.key;
            let childData = keyval.val();
            console.log("KT : ", childKey + " va "+ childData.voucher)
            arrayList.push(
                new ListLearns(childData.name, childData.email, childData.phone, childData.voucher)
            )
        });
    });


    router.post('/savedata',function(req,res){
        const name = req.body.name
        const email = req.body.email
        const phone = req.body.phone
        const voucher = req.body.voucher

        fun_table_realtime_firebase.CreateDatabase_Firebase(name, email,phone,voucher)
            .then(result => {
                res.json(result)
            })
            .catch(err => res.status(err.status).json({message: err.message}))

    })

    router.get('/', function (req, res, next) {
        res.render("trangchu");
    });
    router.get('/admin', function (req, res, next) {
        res.render("admin");
    });




    io.on("connection", function (socket) {

        console.log("da nguoi ket noi : " + socket.id)

        socket.on("client_send", function (data) {

            if (data !== "check") {

                if (arrayList.length === 0) {
                    console.log("Thêm data mảng")
                    io.sockets.emit("server_send_list", arrayList)
                    socket.emit("server_send_check_phone","Đăng kí dự thưởng thành công.!")
                    arrayList.push(
                        new ListLearns(data.name, data.email, data.phone, voucher)
                    )

                    //====> Save firebase
                    fun_table_realtime_firebase.CreateDatabase_Firebase(data.name, data.email, data.phone, voucher)
                        .then(result => {
                            res.json(result)
                        })
                        .catch(err => res.status(err.status).json({message: err.message}))
                    //====> end Save firebase

                } else {
                    console.log("Đã có mảng data và giá trị là : ", inArray(data.phone, arrayList))
                    if (inArray(data.phone, arrayList) === false) {
                        io.sockets.emit("server_send_list", arrayList)
                        socket.emit("server_send_check_phone","Đăng kí dự thưởng thành công.!")
                        //====> Save firebase
                        fun_table_realtime_firebase.CreateDatabase_Firebase(data.name, data.email, data.phone, voucher)
                            .then(result => {
                                res.json(result)
                            })
                            .catch(err => res.status(err.status).json({message: err.message}))
                        //====> end Save firebase

                        arrayList.push(
                            new ListLearns(data.name, data.email, data.phone, voucher)
                        )


                    } else {
                        io.sockets.emit("server_send_list", arrayList)
                        socket.emit("server_send_check_phone","Số điện thoại đã đăng kí dự thưởng, hãy nhập số khác !")
                        console.log(" Số điện thoại đã đăng kí dự thưởng, hãy nhập số khác ! ", inArray(data.phone, arrayList))
                    }
                }

            } else {
                console.log("TK :", "Admin Kiểm tra thông tin dự thưởng")
                io.sockets.emit("server_send_list", arrayList)
            }
        })

        socket.on("client_send_random", function (data) {
            console.log("random :", data)
            socket.emit("server_send_random", data)
            voucher = data
        })
    })




    function ListLearns(name, email, phone, madt) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.madt = madt
    }

    function inArray(value, arr) {
        let count = arr.length;
        for (let i = 0; i < count; i++) {
            if (arr[i].phone === value) {
                return true;
            }
            console.log("Số điện thoại : ", value + " khác " + arr[i].phone)
        }
        return false;
    }
}
