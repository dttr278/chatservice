
var token,user, currentId,preClick;
var host=localStorage.getItem("host");
$(document).ready(function(){
    token=localStorage.getItem("token");
    if(token!=null){
        $.ajaxSetup({
            headers:{
               'Authorization': token,
               'Accept': 'application/json'
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
            localStorage.setItem('name',user.name);
            localStorage.setItem('avatar',user.avatar);
            localStorage.setItem('id',user.id);
            $("#name").text(user.name);
            if(user.avatar!='')
                $("#avatar").attr('src',host+'file/download/'+user.avatar);
        }
    });
    $(".chats").show();
    $("#radio-chat").click(function(){
        $(".chats").show();
        $(".groups").hide();
        $(".contacts").hide(); 
    });
    $("#radio-group").click(function(){
        $(".chats").hide();
        $(".groups").show();
        $(".contacts").hide();  
        getGroups();
    });
    $("#radio-contact").click(function(){
        $(".chats").hide();
        $(".groups").hide();
        $(".contacts").show();
        getContacts();
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

    $("textarea").empty();
    
    $("#btn-send").click(function(){
        sendMesssage($("#input-box").val());
        getNewChats();
    });
    $('#file').on('change', uploadFile);

    $('#search-btn').on('click', function(){
        window.location.href='search.html?kw='+$('#search-input').val();
    });
    getChats();
    getGroups();
    getContacts();
    setInterval(loadData,3000);
    
}
function loadData(){
    if(currentId!=null)
        getMessages(currentId);
    getNewChats();
    getNewGroups();
}

//text area keydown event 
function ipbIsKeyDown(event) {
    if (event.keyCode==13&&!event.shiftKey) {
        sendMesssage($("#input-box").val());
    }
}
//new group btn on click event
function onclickNewGroup(){
    doMessageBox('Tên group:',newGroup,1);
}

//log out onclick
// function logout(){
//     localStorage.removeItem("token");
//     $.ajaxSetup({
//         headers:{
//            'Authorization': ""
//         }
//     });
//     window.location.href="home.html";
// }
/****************************************DATE FORMAT****************************************************** */
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


/********************************XỬ LÝ CHAT***********************************************/
var newms=0;
function getChats() {
    let a=document.createElement('img');
    a.setAttribute('src','src/loader.gif');
    a.setAttribute('class','loader');
    $(".chat-list").append(a);
    $(".chat-list .chat").remove();
    $.get(host+"chats/100", function (data, status) {
        a.remove();
        if(data.result!=0&&data.result!=null){  
            loadChats(data.result);
        }
            
    })
}

function loadChats(lf) {
    newms=lf[0].message_id;
    let a;
    for(let i=0;i<lf.length;i++){ 
        a= loadChat(lf[i]);
        $(".chat-list").append(a);
        if(i==0){
            chatOnclick(lf[i],a);
            currentId=lf[i].chat_id;
        }
           
    }
}
function loadChat(c){
    let rvms='';
    if(c.sender!=user.id && c.sender!=""&& c.is_group=='true')
        rvms='<b>'+c.sender_name.substring(c.sender_name.lastIndexOf(" "))+':</b>';
    if(c.seen_time=="")
        rvms+='<b>'+c.body+'</b>';
    else
        rvms+=c.body;
    
    let icon;
    if(c.is_group=='true') icon='group-icon.png';
    else icon ='44.jpg';

    let avatar;
    if(c.avatar!=""){
        avatar='<img src='+host+'file/download/'+c.avatar+' class="avatar" style="width:40px;height:40px">';
    }
    else{
        avatar='<img src="src/'+icon+'" class="avatar" style="width:40px;height:40px">';
    }

    str='<div class="avatar-box" style="width:50px; height:50px">'+
            avatar+
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
    if(c.contact_id!=''&&c.contact_id!=null){
        $("#name-info-bar").html('<a href="info.html?id='+c.contact_id+'">'+c.name+'</a>');
    }else{
        $("#name-info-bar").text(c.name);
    }
    
    if(preClick!=undefined&&preClick!=event)
        preClick.style.background="";
    if(preClick!=event){
        event.style.background="#f2f2f2";
        preClick=event;
    }
    
    $("#setting").hide();
    if(c.is_group=="true"){    
        $("#setting").show();
        getMembers(c.chat_id);
    }
    
}
function getNewChats() {
    if(newms!=null)
    $.get(host+"chats/100/"+newms, function (data, status) {
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
                    rvms='<b>'+c.sender_name.substring(c.sender_name.lastIndexOf(" "))+':</b>';
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

/****************************************XỬ LÝ CONTACT*********************************************************/
function getContacts(){
    // let a=document.createElement('img');
    // a.setAttribute('src','src/loader.gif');
    // a.setAttribute('class','loader');
    // $(".contact-list").append(a);
    $(".contact-list .contact").remove();
    $.get(host+"contacts/100", function (data, status) {
        if(data.result!=0&&data.result!=null){
            // a.remove();
            loadContacts(data.result);
        }      
    });
}
function loadContacts(lf) {
    let i=$(".contact-list > .contact").length;
    for(i;i<lf.length;i++){
        $(".contact-list").append(loadContact(lf[i]));
    }
}
function loadContact(c){
    let avatar;
    if(c.avatar!=""){
        avatar='<img src='+host+'file/download/'+c.avatar+' class="avatar" style="width:40px;height:40px">';
    }
    else{
        avatar='<img src="src/44.jpg" class="avatar" style="width:40px;height:40px">';
    }
    let str='<div class="avatar-box" style="width:50px; height:50px">'+
        avatar+
        '</div>'+
        '<div class="contact-info" >'+
            '<div class="contact-name">'+
                '<div class="name" >'+c.name+'</div>'+
            '</div>'+
        '</div>';
    let a=document.createElement("div");
    a.id=c.contact_id;
    a.setAttribute("class","contact");
    a.innerHTML=str;
    a.onclick =function() {contactOnclick(c,a);};
    return a;
}
function contactOnclick(c,event){
    if(c.chat_id==null)
        return;
    seen(c.chat_id);

    currentId=c.chat_id;
    $("#messages").empty();

    getMessages(c.chat_id);
   
    if(c.contact_id!=''){
        $("#name-info-bar").html('<a href="info.html?id='+c.contact_id+'">'+c.name+'</a>');
    }else{
        $("#name-info-bar").text(c.name);
    }
    
    if(preClick!=undefined&&preClick!=event)
        preClick.style.background="";
    if(preClick!=event){
        event.style.background="#f2f2f2";
        preClick=event;
    }
    $("#setting").hide();
}

/*********************************************MESSAGE********************************************** */
function getMessages(chatId) {
    if(chatId!=null){
        // let a=document.createElement('img');
        // a.setAttribute('src','src/loader.gif');
        // a.setAttribute('class','loader');
        // $("#messages").append(a);
        $.get(host+"messages/" + chatId+"/100", function (data, status) {
            // a.remove(); 
            if(data.result!=0&&data.result!=null){
                loadMessages(data.result);
            }
        });
    }
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
    if(ms.file_id!=""&&ms.file_id!=null){
        let link=host+'file/download/'+ms.file_id;
        let type=m.substring(m.indexOf(':')+1,m.length);
        if(m.indexOf("image")!=-1){
            m='<div><a href='+link+'><img src='+link+' style="max-width:400px;height:auto"></a></div>';
        }else if(m.indexOf("audio")!=-1){
            m='<div>'
                +'<audio controls>'
                +'<source src="'+link+'" type="'+type+'">Your browser does not support the audio element.'
                +'</audio>'
                +'</a></div>';
        }else if(m.indexOf("video")!=-1){
            m='<div>'
                +'<video width="320" height="240" controls>'
                +'<source src="'+link+'" type="'+type+'">Your browser does not support the video element.'
                +'</video>'
                +'</a></div>';
        }else{
            m='<div class="ms-content"><a href='+link+'>'+m.substring(0,m.indexOf(':'))+'</a></div>';
        }
    }else{
        m='<div class="ms-content">'+ms.body.replace(/\n/gi,'<br>')+'</div>';
    }
   

    stime=dateFormatFull(new Date(ms.send_time)) ;
    a=document.createElement("div");
    if(ms.sender==user.id) {
        a.setAttribute("class","message ms-right");
        str='<div class="ms">'
            +'<div class="ms-dl-btn" onclick="'+'xoams('+ms.message_id+',this)'+'">x</div>'
            +'<div >'
                +'<div class="ms-name">'+ms.name+'</div>'
                +m
                +'<div class="ms-time">'+stime+'</div>' 
            +'</div>'
        +'</div>'  
    }    
    else{
        a.setAttribute("class","message ms-left");
        str='<div class="ms">'
            +'<div >'
                +'<div class="ms-name">'+ms.name+'</div>'
                +m
                +'<div class="ms-time">'+stime+'</div>' 
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
    let a=document.createElement('img');
    a.setAttribute('src','src/loader.gif');
    a.setAttribute('class','loader');
    $("#messages").append(a);

    let m={ message: ms};
    $.post(host+"sendmessage/"+currentId
    ,JSON.stringify(m)
    ,function(data,status){
        a.remove();
        if(data.result!="0"){
            $("#messages").append(loadms(data.result));
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

function uploadFile(event)
{
    if(currentId==null)
        return;
	event.stopPropagation(); 
	event.preventDefault(); 
	var files = event.target.files; 
	var data = new FormData();
	$.each(files, function(key, value)
	{
		data.append('file', value);
	});
    postFilesData(data); 

 }
	
function postFilesData(data)
{
    let a=document.createElement('img');
    a.setAttribute('src','src/loader.gif');
    a.setAttribute('class','loader');
    $("#messages").append(a);

    $.ajax({
        url: 'http://localhost:8080/webchat1/file/send/'+currentId,
        type: 'POST',
        data: data,
        processData: false, 
        contentType: false, 
        success: function(data, textStatus, jqXHR)
        {
            a.remove();
            if(data.result!="0"){
                $("#messages").append(loadms(data.result));
                $("#messages").scrollTop(99999);
                getNewChats();
                getNewGroups();
            }
            $("#file").val("");
        },
        error: function(jqXHR, textStatus, errorThrown)
        {
            console.log('ERRORS: ' + textStatus);
        }
	});
}
/************************************************GROUP*************************************************************/
var newgr;
function getGroups() {
    // let a=document.createElement('img');
    // a.setAttribute('src','src/loader.gif');
    // a.setAttribute('class','loader');
    // $(".group-list").append(a);
    $(".group-list .group").remove();
    $.get(host+"groups/100", function (data, status) {
        if(data.result!=0&&data.result!=null){
            // a.remove();
            loadGroups(data.result);
        }
    })
}
function loadGroups(lf) {
    newgr=lf[0].message_id;
    for(let i=0;i<lf.length;i++){  
        $(".group-list").append(loadGroup(lf[i]));
    }
}
function loadGroup(c){
    let rvms='';
    if(c.sender!=user.id && c.sender!=""&& c.is_group=='true')
        rvms='<b>'+c.sender_name.substring(c.sender_name.lastIndexOf(" "))+':</b>';
    if(c.seen_time=="")
        rvms+='<b>'+c.body+'</b>';
    else
        rvms+=c.body;

    str='<div class="avatar-box" style="width:50px; height:50px">'+
                '<img src="src/group-icon.png" class="avatar" style="width:40px;height:40px">'+
            '</div>'+
            '<div class="chat-info" >'+
                '<div class="chat-name">'+
                    '<div class="name">'+c.name+'</div>'+
                    '<small>'+dateFormat(new Date(c.send_time))+'</small>'+
                '</div>'+
                '<div class="review-ms">'+rvms+'</div>'+  
            '</div>';
    let a=document.createElement("div");
    a.setAttribute("class","group");
    a.id="group"+c.chat_id;
    a.innerHTML=str;
    a.onclick =function() {chatOnclick(c,a);};
    return a;
}
function getNewGroups() {
    if(newgr!=null)
    $.get(host+"groups/100/"+newgr, function (data, status) {
        if(data.result!=0&&data.result!=null){
            loadNewGroups(data.result);
        }   
    });
}
function loadNewGroups(lf) {
    let rvms="",old,gr,c;
    gr= $(".group-list");
    newgr=lf[0].message_id;
    for(let i=lf.length-1;i>=0;i--){
        old=0;
        for(let j=0;j<gr[0].children.length;j++){
            if(gr[0].children[j].id=="group"+lf[i].chat_id){
                old=1;
                c=lf[i];

                rvms="";
                if(c.sender!=user.id && c.sender!=""&& c.is_group=='true')
                    rvms='<b>'+c.sender_name.substring(c.sender_name.lastIndexOf(" "))+':</b>';
                if(c.seen_time=="")
                    rvms+='<b>'+c.body+'</b>';
                else
                    rvms+=c.body;

               $("#group"+lf[i].chat_id+" .review-ms").html(rvms);
               $("#new-gr").after(gr[0].children[j]);
               break;
            }
        }
        if(old==0){
            $("#new-gr").after(loadGroup(lf[i]));
        }  
    };
   
}
function getMembers(grId){
    let a=document.createElement('img');
    a.setAttribute('src','src/loader.gif');
    a.setAttribute('class','loader');
    $("#grmb").append(a);
    $.get(host+"members/"+grId,
    function(data,status){
        a.remove();
        if(data.result!=0&&data.result!=null){ 
            loadMembers(data.result);
        } 
    });
}
function loadMembers(data){
    $("#grmb").empty();
    for(let i=0;i<data.length;i++){
        let a=loadContact(data[i]);
        a.onclick =function(){
           window.location.href='info.html?id='+data[i].contact_id;
        };
        $("#grmb").append(a);
    }
}

function onclickOutGR(){
    doMessageBox('Bạn có muốn rời khỏi nhóm?',
    function(){
        $.ajax({
            url: host+'removegroupmember/'+currentId+'/'+user.id,
            type: 'delete',
            success:function(data){
                if(data.result>0){
                    doMessageBox('Thành công ');
                    getChats();
                }else{
                    doMessageBox('Thất bại! ');
                }
            }
        });
    });
   
}
function newGroup(name){
    name =name.trim();
    if(name!='')
        $.post(host+"newgroup/"+name,
        function(data,status){
            if(data.result>0){
                getGroups();
                doMessageBox("Đã tạo group thành công!");
            }     
        });
    else{
        doMessageBox("Tên group trống!");
    }
}
function addMemberGroup(grId,mbId){
    doMessageBox('Bạn có muốn thêm người này vào nhóm?',
    function(){
        $.post(host+"addgroupmember/"+grId+"/"+mbId,
        function(data,status){
            if(data.result>0){
                doMessageBox("Thành công!");
                getMembers(currentId);
            }else{
                doMessageBox("Thất bại!");
            }
        });
    })
    
}

function renameGR(){
    doMessageBox('Bạn muốn đổi tên group thành: ',
    function(name){
        $.ajax({
            url: host+'renamechat/'+currentId+'/'+name,
            type: 'PUT',
            success:function(data){
                if(data.result>0){
                    doMessageBox('Thành công ');
                    getChats();
                    getMessages();
                }else{
                    doMessageBox('Thất bại! ');
                }
            }
        });
    },1)
    
}
// function removeMemberGroup(grId,mbId){
//     $.post(host+"removegroupmember/"+grId+"/"+mbId,
//     function(data,status){
//         if(data.result>0){
//             doMessageBox("Thành công!");
//         }else{
//             doMessageBox("Thất bại!");
//         }
//     });
// }