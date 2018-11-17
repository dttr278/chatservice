function getMessages(chatId) {
    if(chatId!=null)
        $.get(host+"messages/" + chatId+"/100", function (data, status) {
            if(data.result!=0&&data.result!=null)
                loadMessages(data.result);
        })
}
function loadMessages(lf) {
    let i=$("#messages > .message").length;
    for (i; i < lf.length; i++) {    
        $("#messages").append(loadms(lf[i]));
        $("#messages").scrollTop(99999);
    }
}
function loadms(ms){
    let str,a,m,stime;
    m=ms.body.replace(/\n/gi,'<br>'); 
    stime=dateFormatFull(new Date(ms.send_time)) ;
    a=document.createElement("div");
    if(ms.sender==user.id) {
        a.setAttribute("class","message ms-right");
        str='<div class="ms">'
            +'<div class="ms-dl-btn" onclick="'+'xoams('+ms.message_id+',this)'+'">x</div>'
            +'<div >'
                +'<div class="ms-time">'+stime+'</div>'
                +'<div class="ms-content">'+m+'</div>' 
                +'<div class="ms-name">'+ms.name+'</div>'
            +'</div>'
        +'</div>'  
    }    
    else{
        a.setAttribute("class","message ms-left");
        str='<div class="ms">'
            +'<div >'
                +'<div class="ms-time">'+stime+'</div>'
                +'<div class="ms-content">'+m+'</div>' 
                +'<div class="ms-name">'+ms.name+'</div>'
            +'</div>'
            +'<div class="ms-dl-btn" onclick="'+'xoams('+ms.message_id+',this)'+'">x</div>'
        +'</div>'  
    }  
    a.innerHTML=str;
    return a;
}
function xoams(msId,msDl){
    msid=msId;
    msdl=msDl;
    doMessageBox("Bạn có chắc chắn muốn xóa tin nhắn này không?",delMS);
}
var msid,msdl;
function delMS(){
    $.ajax({
        url: host+"deletems/"+msid,
        type: 'delete',
        success: function(data){
            if(data.result>0){
                msdl.parentElement.parentElement.remove();
                getChats();
            }
        }
    });
}
function sendMesssage(ms) {
    let m={ message: ms};
    let message;
    $.post(host+"sendmessage/"+currentId
    ,JSON.stringify(m)
    ,function(data,status){
        if(data.result>0){
            message={
                "message_id": data.result,
                "body": ms,
                "send_time": new Date(),
                "seen_time":new Date(),
                "sender": user.id,
                "name":user.name
                };
            $("#messages").append(loadms(message));
            $("#messages").scrollTop(99999);
            getNewChats();
            getNewGroups();
        }
        $("#input-box").val("");
        
       
    });
}
function seen(chatId){
    $.ajax({
        url: host+"seen/"+chatId,
        type: 'PUT'
    });
}