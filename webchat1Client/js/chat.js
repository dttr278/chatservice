
var token,user,header;
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
        $("html").text("Chưa đăng nhập");
    }
   
});
function init(){
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
        $(".contacts").hide();
        $(".searchs").hide();   
    });
    $("#radio-contact").click(function(){
        getContacts();
        $(".chats").hide();
        $(".contacts").show();
        $(".searchs").hide();
    });
    $("#radio-addct").click(function(){
        $(".chats").hide();
        $(".contacts").hide();
        $(".searchs").show();
    });
    $("#chat-input").on("keyup",function(){
        var value = $(this).val().toLowerCase();
        $(".chats .chat").filter(
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
    
   
    getContacts();
    getChats();
    setInterval(loadData,2000);
}
function ipbIsKeyDown(event) {
    if (event.keyCode==13&&!event.shiftKey) {
        sendMesssage($("#input-box").val());
    }
}

function loadData(){
    getMessages(currentId);
    getNewChats();
}

var currentId,preClick;
function logout(){
    localStorage.removeItem("token");
    $.ajaxSetup({
        headers:{
           'Authorization': ""
        }
    });
    window.location.href="home.html";
}
function getContacts(){
    $.get(host+"contacts", function (data, status) {
        if(data.result!=0&&data.result!=null)
            loadContact(data.result);
    });
}
function loadContact(lf) {
    let str;
    let i=$(".contact-list > .contact").length;
    for(i;i<lf.length;i++){
        str='<div class="avatar-box" style="width:50px; height:50px">'+
                '<img src="src/44.jpg" class="avatar" style="width:40px;height:40px">'+
            '</div>'+
            '<div class="contact-info" >'+
                '<div class="contact-name">'+
                    '<div class="name" >'+lf[i].name+'</div>'+
                '</div>'+
            '</div>';
        let a=document.createElement("div");
        a.setAttribute("class","contact");
        a.innerHTML=str;
        let s=lf[i].id + ",this,"+'"'+lf[i].name+'"';
        a.setAttribute("onclick", "contactOnclick(" +s +")");
        $(".contact-list").append(a);
    }
}
function contactOnclick(id,event,name){
    if(id==null)
        return;
    $.post(host+"seen/"+id);

    currentId=id;
    $("#messages").empty();
    getMessages(id);
    
    $("#name-info-bar").text(name);
    if(preClick!=undefined)
        preClick.style.background="";
    event.style.background="#f2f2f2";
    preClick=event;

}
//////////////////////////////////////////
function getChats() {
    $.get(host+"chats", function (data, status) {
        if(data.result!=0&&data.result!=null)
            loadChats(data.result);
    })
}
function loadChats(lf) {
    let str;
    let rvms;
    for(let i=0;i<lf.length;i++){
        rvms=lf[i].body;
        if(lf[i].seen_time=="")
            rvms='<b>'+lf[i].body+'</b>';
        str='<div class="avatar-box" style="width:50px; height:50px">'+
                '<img src="src/44.jpg" class="avatar" style="width:40px;height:40px">'+
            '</div>'+
            '<div class="chat-info" >'+
                '<div class="chat-name">'+
                    '<div class="name">'+lf[i].name+'</div>'+
                    '<small>'+dateFormat(new Date(lf[i].send_time))+'</small>'+
                '</div>'+
                '<div class="review-ms">'+rvms+'</div>'+  
            '</div>';
        let a=document.createElement("div");
        a.setAttribute("class","chat");
        a.innerHTML=str;
        let s=lf[i].contact_id + ",this,"+'"'+lf[i].name+'"';
        a.setAttribute("onclick", "contactOnclick(" +s +")");
        $(".chat-list").append(a);
    }
}
function loadNewChats(lf) {
    let str;
    let rvms;
    let j=$(".chat-list > .chat").length;
    let i=j;
    for( i;i<lf.length;i++){
        rvms=lf[i-j].body;
        if(lf[i-j].seen_time=="")
            rvms='<b>'+lf[i-j].body+'</b>';
        str='<div class="avatar-box" style="width:50px; height:50px">'+
                '<img src="src/44.jpg" class="avatar" style="width:40px;height:40px">'+
            '</div>'+
            '<div class="chat-info" >'+
                '<div class="chat-name">'+
                    '<div class="name">'+lf[i-j].name+'</div>'+
                    '<small>'+dateFormat(new Date(lf[i-j].send_time))+'</small>'+
                '</div>'+
                '<div class="review-ms">'+rvms+'</div>'+  
            '</div>';
        let a=document.createElement("div");
        a.setAttribute("class","chat");
        a.innerHTML=str;
        let s=lf[i-j].contact_id + ",this,"+'"'+lf[i-j].name+'"';
        a.setAttribute("onclick", "contactOnclick(" +s +")");
         $(".chat-list input").after(a);
      //  $(".chat-list").prepend(a);
    }
}
function getNewChats() {
    $.get(host+"chats", function (data, status) {
        if(data.result!=0&&data.result!=null){
            loadNewRVMS(data.result);
            loadNewChats(data.result);
        }
        
    });
}
function loadNewRVMS(lf){
    let str;
    let rvms;
    for(let i=0;i<lf.length;i++){
        rvms=lf[i].body;
        if(lf[i].seen_time=="")
            rvms='<b>'+lf[i].body+'</b>';
        $(".chat-list .review-ms:eq("+i+")").html(rvms);
    }
}
/*********************************/
function getMessages(id2) {
    if(id2!=undefined)
        $.get(host+"messages/" + id2, function (data, status) {
            if(data.result!=0&&data.result!=null)
                loadMessages(data.result);
        })
}
function loadMessages(lf) {
    let str,a,m,stime,xoa;
    let i=$("#messages > .message").length;
    for (i; i < lf.length; i++) {
        m=lf[i].body.replace(/\n/gi,'<br>'); 
        stime=dateFormatFull(new Date(lf[i].send_time)) ;
        a=document.createElement("div");
        xoa='xoams('+lf[i].id+',)';
        if(lf[i].sender==user.id) {
            a.setAttribute("class","message ms-right");
            str='<div class="ms">'
                +'<div class="ms-dl-btn" onclick="'+xoa+'">x</div>'
                +'<div >'
                    +'<div class="ms-time">'+stime+'</div>'
                    +'<div class="ms-content">'+m+'</div>' 
                +'</div>'
            +'</div>'  
        }    
        else{
            a.setAttribute("class","message ms-left");
            str='<div class="ms">'
                +'<div >'
                    +'<div class="ms-time">'+stime+'</div>'
                    +'<div class="ms-content">'+m+'</div>' 
                +'</div>'
                +'<div class="ms-dl-btn" onclick="'+xoa+'">x</div>'
            +'</div>'  
        }
           
        a.innerHTML=str;
        $("#messages").append(a);
        $("#messages").scrollTop(99999);
    }
}
function xoams(msid){
    messageId=msid;

    doMessageBox("Bạn có chắc chắn muốn xóa tin nhắn này không?",delMS);
}
var messageId;
function delMS(){
    $.ajax({
        url: host+"deletems/"+messageId,
        type: 'delete',
        success: function(data){
            if(data.result>0){
                $("#messages").empty();
                getMessages(currentId);
            }
        }
    });
}
function sendMesssage(ms) {
    var m={ message: ms};
    $.post(host+"sendmessage/"+currentId
    ,JSON.stringify(m)
    ,function(data,status){
        getMessages(currentId);
        $("#input-box").val("");
    });
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
function addContatc(id2){
    $.post(host+"addcontact/"+id2,function(data,status){
        if(data.result>0){
            alert("Thành công!");
        }else{
            alert("Thất bại");
        }
    });
}