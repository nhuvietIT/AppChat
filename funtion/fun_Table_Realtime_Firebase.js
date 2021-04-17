const msetDatabase_Firebase = require("../model/setDatabase_Firebase");
const firebase = require("../firebase/firebase_connect")

exports.CreateDatabase_Firebase = (name, email,phone,maduthuong) =>
    new Promise((resolve, reject) => {

        firebase.database().ref("danhsachduthuong/" + phone).set({
            name: name,
            email: email,
            phone: phone,
            maduthuong : maduthuong
        })
        resolve({status: 201, message: "Products Update Sucessfully !"});

    })
