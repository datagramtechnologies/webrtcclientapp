
const startButton = document.getElementById('startButton');
const callButton = document.getElementById('callButton');
const hangupButton = document.getElementById('hangupButton');
const answerButton = document.getElementById('answerButton');
callButton.disabled = true;
hangupButton.disabled = true;
// startButton.addEventListener('click', start);
callButton.addEventListener('click', callNow);
hangupButton.addEventListener('click', hangUp);

const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');


var url_string = window.location.href;
var url = new URL(url_string);
var mid = url.searchParams.get("meetId");

var p1;
var peer_o;
let localStrm = new MediaStream();
start();

function start() {

    p1 = new Peer(
        {
            config: {
                'iceServers': [
                    {
                        'url': 'turn:68.183.92.89:3478',
                        'username': '10032021',
                        'credential': '100320211206'
                    }
                ]
            },
            host: '68.183.92.89',
            port: 3000,
            path: '/peerapp',
            secure:false
        })

    p1.on('open', function (id) {
        console.log(id)
        let encurl = encodeURI("https://stream.tagerp.com?meetId=" + id);
        let lurl = "https://wa.me/?text=" + encurl;
        document.querySelector("#myId").innerHTML = id;
        document.querySelector("#washare").innerHTML ="<a style='color:#36d21a' href=" + lurl + "><i class='fab fa-2x fa-whatsapp'></i></a>";

        console.log('connected to server');
        
        var c = p1.connect(id);

        // call();
        console.log(c)
        c.on('open', function (data) {
            console.log('connected to peer');
            c.send('connection working');
        });
    });

   
    
    p1.on('call', function(call) {
        // Answer the call, providing our mediaStream
        call.answer(localStrm);
        call.on('stream', function(remoteStream) {
            remoteVideo.srcObject = remoteStream;
        });
        
      });


    callButton.disabled = false;
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    getUserMedia({ video: true, audio: true }, function (stream) {
        localVideo.srcObject = stream;
        localStrm = stream;
        console.log(stream)
        
    });
setTimeout(() => {
    if(mid){
        document.querySelector("#meetId").value=mid;
        
            callNow();
        }
        }, 3000);
        
    

}



function callNow(){    
    console.log("mid")
    mid= document.querySelector("#meetId").value 


  
       let rcall = p1.call(mid,localStrm);
       rcall.on('stream', function(remoteStream) {
                  console.log("Rstream",remoteStream)
                remoteVideo.srcObject = remoteStream;
                // Show stream in some video/canvas element.
              });
    
   
}

function hangUp() {
    p1.destroy();
    setTimeout(() => {
        location.href="thankyou.html"
    }, 1500);
    

}