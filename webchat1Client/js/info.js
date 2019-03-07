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
var id,token,host;
function init(){
    let name,avatar,userId;
    id=findGetParameter('id');
    if(id==null)id='';

    userId=localStorage.getItem('id');
    name=localStorage.getItem('name');
    avatar=localStorage.getItem('avatar');

    if(id==userId||id==''){
        id='';
        $('#btn-add').hide(); 
    }else{
        $("#change-avatar").hide();
    }
    $("#name").text(name);
    if(avatar!=''){
        $("#avatar").attr('src',host+'file/download/'+avatar);
    }

    getInfo();
    $('#file').on('change', uploadFile);
    $('#search-btn').on('click', function(){
        window.location.href='search.html?kw='+$('#search-input').val();
    });
    $('#btn-add').on('click',function(){
        addContatc(id);
    });
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
function getInfo(){
    $.get(
        host+'info/'+id,
        function(data,status){
            if(data.result!="null"){
                if(data.result.avatar!='')
                    $(".avatar").attr('src',host+'file/download/'+data.result.avatar);
                if(data.result.chat_id!='')
                    $('#btn-add').remove();
                $('.name').text(data.result.name);
                $('.sex').text(data.result.sex);
                $('.email').text(data.result.email);
                $('.username').text(data.result.username);
            }
        }
    );
}

function uploadFile(event)
{
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
    $.ajax({
        url: host+'avatar',
        type: 'POST',
        data: data,
        processData: false, 
        contentType: false, 
        success: function(data, textStatus, jqXHR)
        {
            if(data.result!="0"){
                $("#avatar").attr('src',host+'file/download/'+data.result);
            }
            $("#file").val("");
        },
        error: function(jqXHR, textStatus, errorThrown)
        {
            console.log('ERRORS: ' + textStatus);
        }
	});
}

function addContatc(id2){
    doMessageBox("Bạn muốn thêm người này vào liên hệ!",
        function(){
            $.post(host+"addcontact/"+id2,function(data,status){
                if(data.result>0){
                    doMessageBox("Thành công!");
                    location.reload();
                }else{
                    doMessageBox("Thất bại");
                }
                
            });
    });
}
