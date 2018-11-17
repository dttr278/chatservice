var newms;
function getChats() {
    $(".chat-list .chat").remove();
    $.get(host+"chats/100", function (data, status) {
        if(data.result!=0&&data.result!=null)
            loadChats(data.result);
    })
}
function loadChats(lf) {
    newms=lf[0].message_id;
    for(let i=0;i<lf.length;i++){  
        $(".chat-list").append(loadChat(lf[i]));
    }
}
function loadChat(c){
    let rvms='';
    if(c.sender!=user.id && c.sender!=""&& c.is_group=='true')
        rvms='<b>'+c.sender_name+':</b>';
    if(c.seen_time=="")
        rvms+='<b>'+c.body+'</b>';
    else
        rvms+=c.body;
    str='<div class="avatar-box" style="width:50px; height:50px">'+
                '<img src="src/44.jpg" class="avatar" style="width:40px;height:40px">'+
            '</div>'+
            '<div class="chat-info" >'+
                '<div class="chat-name">'+
                    '<div class="name">'+c.name+'</div>'+
                    '<small>'+dateFormat(new Date(c.send_time))+'</small>'+
                '</div>'+
                '<div class="review-ms">'+rvms+'</div>'+  
            '</div>';
    let a=document.createElement("div");
    a.setAttribute("class","chat");
    a.id="chat"+c.chat_id;
    a.innerHTML=str; 
    a.onclick =function() {chatOnclick(c,a);};
    return a;
}
function chatOnclick(c,event){
    if(c.chat_id==null)
        return;
    seen(c.chat_id);

    let rvms= $("#"+event.id+" .review-ms");
    rvms.html(rvms.text());

    currentId=c.chat_id;
    $("#messages").empty();

    getMessages(c.chat_id);
    $("#name-info-bar").text(c.name);
    
    if(preClick!=undefined&&preClick!=event)
        preClick.style.background="";
    if(preClick!=event){
        event.style.background="#f2f2f2";
        preClick=event;
    }
    $("#setting").show();
    $("#addgrmb").hide();
    $("#grmb").hide();
    if(c.is_group=="true"){    
        $("#addgrmb").show();
        $("#grmb").show();
        getMembers(c.chat_id);
    }
    
}
function getNewChats() {
    $.get(host+"chats/100/"+newms+"/null/", function (data, status) {
        if(data.result!=0&&data.result!=null){
            loadNewChats(data.result);
        }   
    });
}
function loadNewChats(lf) {
    let rvms='',old,chatl=$(".chat-list"),c;
    newms=lf[0].message_id;
    for(let i=lf.length-1;i>=0;i--){
        old=0;
        for(let j=0;j<chatl[0].children.length;j++){
            if(chatl[0].children[j].id=="chat"+lf[i].chat_id){
                old=1;
                c=lf[i];
                rvms="";
                if(c.sender!=user.id && c.sender!=""&& c.is_group=='true')
                    rvms='<b>'+c.sender_name+':</b>';
                if(c.seen_time=="")
                    rvms+='<b>'+c.body+'</b>';
                else
                    rvms+=c.body;
               $("#chat"+lf[i].chat_id+" .review-ms").html(rvms);
               $("#chat-input").after(chatl[0].children[j]);
               break;
            }
        }
        if(old==0){
            $("#chat-input").after(loadChat(lf[i]));
        }  
    };
}