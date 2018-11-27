var host,token;
$(document).ready(function(){
    host=localStorage.getItem("host");
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
    let key=findGetParameter('kw');
    if(key!=null){
        getSearch(key);
        $('#search-input').val(key)
    }else{
        getSearch();
    }
    $('#search-btn').click(function(){
        getSearch($('#search-input').val());
    });

    let userId,name,avatar;
    userId=localStorage.getItem('id');
    name=localStorage.getItem('name');
    avatar=localStorage.getItem('avatar');

    $("#name").text(name);
    if(avatar!='')
        $("#avatar").attr('src',host+'file/download/'+avatar);
}
function getSearch(val) {
    let link=host+"search/"+val+'/100';
    if(val)
        val=val.trim();
    if(val==""||!val){
        link=host+'search/100';
    }
    $.get(link, function (data, status) {
        if(data.result!=0&&data.result!=null)
            loadSearch(data.result);
    });
}
function loadSearch(lf){
    let str,link;
    $(".center").empty();
    for(let i=0;i<lf.length;i++){
        if(lf[i].avatar!='')
            link=host+'file/download/'+lf[i].avatar;
        else
            link='src/44.jpg';
        str='<div class="contact-info">'
                +'<div onclick=onclickCT('+lf[i].id+') class="contact">'
                    +'<div><img src="'+link+'" class="avatar"></div>'
                    +'<div class="info" >'
                        +'<div class="ct-name"><b >'+lf[i].name+'</b></div>'
                        +'<div class="ct-name">'
                            +'<span >@'+lf[i].user_name+'</span>'
                        +'</div>'  
                    +'</div>'  
                +'</div>'
                +'<label class="addcontact" onclick="addContatc('+lf[i].id+')"><i class="material-icons">person_add</i></label>'
            +'</div>'
        let a=document.createElement("div");
        a.setAttribute("class","chat");
        a.innerHTML=str;
        $(".center").append(a);
    }
}

function addContatc(id2){
    doMessageBox("Bạn muốn thêm người này vào liên hệ!",
        function(){
            $.post(host+"addcontact/"+id2,function(data,status){
                if(data.result>0){
                    doMessageBox("Thành công!");
                    getSearch($('#search-input').val());
                }else{
                    doMessageBox("Thất bại");
                }
            });
    });
}

function onclickCT(id){
    window.location.href ='info.html?id='+id;
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}