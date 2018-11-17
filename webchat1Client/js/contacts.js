function getContacts(){
    $(".contact-list .contact").remove();
    $.get(host+"contacts/100", function (data, status) {
        if(data.result!=0&&data.result!=null){
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
    let str='<div class="avatar-box" style="width:50px; height:50px">'+
        '<img src="src/44.jpg" class="avatar" style="width:40px;height:40px">'+
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
}
function addContatc(id2){
    $.post(host+"addcontact/"+id2,function(data,status){
        if(data.result>0){
            doMessageBox("Thành công!");
        }else{
            doMessageBox("Thất bại");
        }
    });
}