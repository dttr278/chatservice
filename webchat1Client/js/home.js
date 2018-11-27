// var host="http://localhost:8080/webchat1/";
var host="https://dttrchatservice.herokuapp.com/";
$(document).ready(function(){
    localStorage.setItem("host",host);
    $("#sign-up-link").click(function(){
        $("#signin").hide();
        $("#signup").slideDown();
    });
    $("#sign-in-link").click(function(){
        $("#signin").slideDown();
        $("#signup").hide();
    });
    
    $("input").blur(function(){
        $(this).next().text($(this).prop("validationMessage"));
    });
     $("#btn-sign-in").click(function(){
        $("#noti-sign-in").html('<img src="src/loader.gif" border="0" alt="Loading, please wait..." />');
         let user=$("#user").val();
         let pass=$("#pass").val();
         let a=$("#signin").is(":valid");
         if(a==true){
            $.get(host + "login/"+user+"/"+pass,
            function(data, status){ 
                if(data.token!=0){ 
                    localStorage.setItem("token",data.token);
                    window.location.href="chat.html";
                    
                }else{
                    $("#noti-sign-in").text("Thông tin không chính xác !");
                }
            });
        }
        else{
            $("#noti-sign-in").text("Chưa nhập đầy đủ thông tin!");
        }
     });
    $("#btn-sign-up").click(function(){
        $("#noti-sign-up").html('<img src="src/loader.gif" border="0" alt="Loading, please wait..." />');
        let a=$("#signup").is(":valid");
        if(a==true){
            let user=$("#user_sgup").val(),pass=$("#pass_sgup").val(),name=$("#name").val(),email=$("#email").val(),gender=$("input[name='gender']:checked").val();
            let body={
                username: user,
                password: pass,
                name: name,
                email: email,
                sex: gender,
                birthday: "2-2-2002",
                phone: ""
            }
            $.post(host+"createuser",
            JSON.stringify(body),
            function(data){
                if(data.result>0){
                    alert("Đăng ký thành công!")
                    window.location.href="home.html";
                }else{
                    $("#noti-sign-up").text("Thất bại!");
                }
            });
        }else{
            $("#noti-sign-up").text("Chưa nhập đầy đủ thông tin!");
        }
       
    });
    $("#user_sgup").blur(function(){
        if($(this).is(":valid")){
            $.get(host+"checkuser/"+$(this).val(),
            function(data, status){
                if(data.result==1){
                    $("#user_sgup").next().text("Đã có!");
                }
            });
        }
    });
    $("#email").blur(function(){
        if($(this).is(":valid")){
            $.get(host+"checkemail/"+$(this).val(),
            function(data, status){
                if(data.result){
                    $("#email").next().text("Đã có!");
                }
            });
        }
    });

    $("#repass_sgup").blur(function(){
        if($(this).is(":valid"))
        if( $("#pass_sgup").val()!= $("#repass_sgup").val()){
            $("#repass_sgup").next().text("2 mật khẩu không khớp");
        }
    });
 });



