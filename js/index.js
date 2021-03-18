
var url_string = window.location.href;
var url = new URL(url_string);
var mid = url.searchParams.get("meetId");

$("#meetId").val(mid);


function newMeeting(){
    location.href = "call.html";
} 
 
function joinMeeting(){
    let meetId = $("#meetId").val();
    if(meetId!=''){
        console.log(meetId)
    location.href = "call.html?&meetId="+meetId;
    }
    else{
        alert("Please enter valid meet id")
    }
    
}
 
 
 
 
 
 
 
 
 
 
 