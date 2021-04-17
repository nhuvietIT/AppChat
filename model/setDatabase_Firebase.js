const firebase = require("../firebase/firebase_connect")

const mList_product = {
    username : String,
    email : String

}



module.exports  ={

    setData: function(req,callback){
        let username = req.username

        firebase.database().ref("users/"+username).set({
            name : req.username,
            email : req.email
        })

        callback(null,{"status code" : 200, "message : " : "insert successfuly"})
    }

}

//////////////////////////////////==================================
// const mList_product = new mongoose.Schema({
//
//     name_pro: String,
//     img_pro_size1: String,
//     img_pro_size2: String,
//     img_pro_size3: String,
//     infor_pro : String,
//     uses_pro: String
//
// });
// // mongoose.Promise = global.Promise;
// module.exports = mongoose.model("List_extract", mList_product);
