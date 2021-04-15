const socket = io("http://localhost:3000/");

socket.on("server_send_list",function(data){
    $("#ds").html("")
    data.forEach(function (list,index) {
        $("#ds").append("<div class=\"listlearn\">" +
            "<div class=\"hang1\">Mã dự thưởng: "+index+" || <span style=\"color:#782a2a\">"+
            list.name+" - "+list.email+" - "+list.phone+" </span></div> \n" +

            "</div>")

    })

})

$(document).ready(function () {
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
