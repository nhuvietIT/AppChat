const msetDatabase_Firebase = require("../model/setDatabase_Firebase");
const firebase = require("../firebase/firebase_connect")

exports.CreateDatabase_Firebase = (name, email, phone, voucher) =>
    new Promise((resolve, reject) => {

        firebase.database().ref("danhsachduthuong/" + phone + "-" + voucher).set({
            name: name,
            email: email,
            phone: phone,
            voucher: voucher
        })
        resolve({status: 201, message: "Products Update Sucessfully !"});

    })

exports.ViewListVoucher = () => {

}
