const socket = io("http://localhost:3000/");

socket.on("server_send_list", function (data) {
    $("#ds").html("")
    data.forEach(function (list, index) {
        $("#ds").append("<div class=\"listlearn\">" +
            "<div class=\"hang1\">Stt : " + index + " || <span style=\"color:#782a2a\">" +
            list.name + " - " + list.email + " - " + list.phone + " - mã dự thưởng : " + list.madt +" </span></div> \n" +
            "</div>")

    })
})

socket.on("server_send_random", function (data) {
    $('#txtrandom').html("")
    $('#txtrandom').append(" Mã dự thưởng của bạn là : " +data )

})
$(document).ready(function () {

    $("#bnt_random").click(function () {
        const x = Math.floor((Math.random() * 100) + 1);
        socket.emit("client_send_random", x)
    })
    $("#bnt_send").click(function () {
        socket.emit("client_send",
            {
                name: $("#txtname").val(),
                email: $("#txtemail").val(),
                phone: $("#txtphone").val()
            }
        )
    })

})
