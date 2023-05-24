var socket = io(); //client side //creates a user who connects to websocket which will be access in server side.


// function UserAddBtnClick(){
//     console.log("CLIEKCED");
//     socket.emit('addNewUser') //emitting new event
// }

// socket.on('countUpdate', (count)=>{  //receiving data from server.
//     console.log("The user Count is ", count);
// })


document.getElementById('msg-form').addEventListener('submit', (e)=>{
    e.preventDefault() //to avoid default refresh
    let msg = e.target.elements.msg.value
    
    socket.emit('MessageSent', msg, (returnMsg)=>{ //3rd is acknowledgement 
        console.log(returnMsg)
    })
})

socket.on('MessageReceived', (RcvdMsg)=>{
    console.log("New message received ", RcvdMsg);
})

socket.on('SendUserMsg', (value)=>{
    console.log(value.msg, "and joined at ", moment( value.joinedDateTime).format());
})


