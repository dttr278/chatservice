
var token,user,header, currentId,preClick;
var host=localStorage.getItem("host");
$(document).ready(function(){
    token=localStorage.getItem("token");
    if(token!=undefined&&token!=null){
        $.ajaxSetup({
            headers:{
               'Authorization': token,
               'Accept': 'application/json',
                'Content-Type': 'application/json' 
            }
         });
         init();
    }else{
        $("body").html('<a href="./home.html">Click here to signin.</a>');  
    }
   
});
function init(){
    $("#setting").hide();
    $.get(host+"info",function(data,status){
        if(data.result!=null&&data.result!=0){
            user=data.result;
            $("#name").text(user.name);
            $("#username").text('@'+user.username);
        }
    });
    $(".chats").show();
    $("#radio-chat").click(function(){
        $(".chats").show();
        $(".groups").hide();
        $(".contacts").hide();
        $(".searchs").hide();   
    });
    $("#radio-group").click(function(){
        $(".chats").hide();
        $(".groups").show();
        $(".contacts").hide();
        $(".searchs").hide();   
        getGroups();
    });
    $("#radio-contact").click(function(){
        $(".chats").hide();
        $(".groups").hide();
        $(".contacts").show();
        $(".searchs").hide();
        getContacts();
    });
    $("#radio-addct").click(function(){
        $(".chats").hide();
        $(".groups").hide();
        $(".contacts").hide();
        $(".searchs").show();
    });
    $("#addgrmb-input").on("keyup",function(){
        $("#searchgrmb").empty();
        var value = $(this).val().toLowerCase(); 
        $(".contacts .contact").filter(
            function(){
                if($(this).text().toLowerCase().indexOf(value) > -1&&value.length>0){
                    let id=$(this).prop('id');
                    let a=$(this).clone(); 
                    a.prop('onclick',null);   
                    a.click(function() {
                        addMemberGroup(currentId,id);
                        $("#searchgrmb").empty();
                        $("#addgrmb-input").val('');
                    });
                    $("#searchgrmb").append(a);
                }
               
            }
        );
    });
    $("#chat-input").on("keyup",function(){
        var value = $(this).val().toLowerCase();
        $(".chats .chat").filter(
            function(){
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            }
        );
    });
    $("#group-input").on("keyup",function(){
        var value = $(this).val().toLowerCase();
        $(".groups .group").filter(
            function(){
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            }
        );
    });
    $("#contact-input").on("keyup",function(){
        var value = $(this).val().toLowerCase();
        $(".contacts .contact").filter(
            function(){
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            }
        );
    });
    $("#search-btn").on("click",function(){
        var value = $("#search-input").val().toLowerCase();
        getSearch(value);
    });
    $("textarea").empty();
    
    $("#btn-send").click(function(){
        sendMesssage($("#input-box").val());
        getNewChats();
    });
    
    getChats();
    getGroups();
    getContacts();
    setInterval(loadData,3000);
}

function ipbIsKeyDown(event) {
    if (event.keyCode==13&&!event.shiftKey) {
        sendMesssage($("#input-box").val());
    }
}

function onclickNewGroup(){
    doMessageBox('Tên group:',newGroup,1);
}
function loadData(){
    if(currentId!=null)
        getMessages(currentId);
    getNewChats();
    getNewGroups();
}


function logout(){
    localStorage.removeItem("token");
    $.ajaxSetup({
        headers:{
           'Authorization': ""
        }
    });
    window.location.href="home.html";
}

function dateFormat(date){
    let n=new Date();
    if(date.getFullYear()!=n.getFullYear()){
        return date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear();
    }else if(date.getMonth() != n.getMonth()){
        return date.getDate()+' Tháng '+(parseInt(date.getMonth(),10)+1);
    }else if(date.getDay()!=n.getDay()){
        if(date.getDay()==7){
            return 'CN';
        }else{
            return 'T'+(date.getDay()+1);
        }
    }else{
        return date.getHours()+':'+date.getMinutes();
    }
}
function dateFormatFull(date){
    let n=new Date(),d;
    if(date.getFullYear()!=n.getFullYear()){
        d= date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear();
    }else if(date.getMonth() != n.getMonth()){
        d= date.getDate()+' Tháng '+(parseInt(date.getMonth(),10)+1);
    }else if(date.getDay()!=n.getDay()){
        if(date.getDay()==7){
            d= 'CN';
        }else{
            d= 'T'+(date.getDay()+1);
        }
    }else{
        return date.getHours()+':'+date.getMinutes();
    }
    return d+' '+date.getHours()+':'+date.getMinutes();
}

function getSearch(val) {
    if(val!=""){
        $.get(host+"search/"+val, function (data, status) {
            if(data.result!=0&&data.result!=null)
                loadSearch(data.result);
        });
    }else{
        $(".searchls").empty();
    }
}
function loadSearch(lf){
    let str;
    $(".searchls").empty();
    for(let i=0;i<lf.length;i++){
        str='<div class="avatar-box" style="width:50px; height:50px">'+
                '<img src="src/44.jpg" class="avatar" style="width:40px;height:40px">'+
            '</div>'+
            '<div class="chat-info" >'+
                '<div class="chat-name">'+
                    '<div class="name">'+lf[i].name+'</div>'+
                    '<button style="width:50px" onclick="addContatc('+lf[i].id+')">Add</button>'+
                '</div>'+
            '</div>';
        let a=document.createElement("div");
        a.setAttribute("class","chat");
        a.innerHTML=str;
        $(".searchls").append(a);
    }
}
