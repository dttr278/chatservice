var newgr;
function getGroups() {
    $(".group-list .group").remove();
    $.get(host+"groups/100", function (data, status) {
        if(data.result!=0&&data.result!=null)
            loadGroups(data.result);
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
    a.setAttribute("class","group");
    a.id="group"+c.chat_id;
    a.innerHTML=str;
    a.onclick =function() {chatOnclick(c,a);};
    return a;
}
function getNewGroups() {
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
                    rvms='<b>'+c.sender_name+':</b>';
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
    $.get(host+"members/"+grId,
    function(data,status){
        if(data.result!=0&&data.result!=null){
            loadMembers(data.result);
        } 
    });
}
function loadMembers(data){
    $("#grmb").empty();
    for(let i=0;i<data.length;i++){
        $("#grmb").append(loadContact(data[i]));
    }
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
    $.post(host+"addgroupmember/"+grId+"/"+mbId,
    function(data,status){
        if(data.result>0){
            doMessageBox("Thành công!");
            getMembers(currentId);
        }else{
            doMessageBox("Thất bại!");
        }
    });
}
function removeMemberGroup(grId,mbId){
    $.post(host+"removegroupmember/"+grId+"/"+mbId,
    function(data,status){
        if(data.result>0){
            doMessageBox("Thành công!");
        }else{
            doMessageBox("Thất bại!");
        }
    });
}