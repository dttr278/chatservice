// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target ==  document.getElementById('messagebox')) {
        document.getElementById('messagebox').style.display = "none";
    }
}
var messageboxOk;
function doMessageboxOk(){
    messageboxOk();
    document.getElementById('messagebox').style.display = "none";
}
function doMessageBox(ms,callback){
    var messagebox= document.getElementById('messagebox')
    if(messagebox==null){
        let str=
        '<div class="messagebox" id="messagebox">'
        +'<div class="container animate" >'
            +'<div class="message" id="messageboxms"></div>'
            +'<div class="footer">'
            +'<button onclick="doMessageboxOk()">ok</button>|'
            +'<button onclick=\'document.getElementById("messagebox").style.display="none"\'>cancel</button>'
            +'</div>'
        +'</div>'
        +'</div>'
        var node= document.createElement("div"); 
        node.innerHTML=str;
        document.body.append(node);
    }
    document.getElementById('messageboxms').innerHTML=ms;
    messageboxOk=callback;
    document.getElementById('messagebox').style.display = "block";
}



