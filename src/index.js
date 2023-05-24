const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = express()
const server = http.createServer(app) //when we do app.listen(), express creates an http server behind the scene but since socketio expects a server, 
                                      // we create one explicitely and pass to socketio as well as call .listen() using the server.
const io = socketio(server) 

const port = process.env.PORT || 3000
const publicDirPath = path.join(__dirname, '../public' )

app.use(express.static(publicDirPath))

server.listen(port, ()=>{  
    console.log(`App running at ${port} successfully!`);
})

let userCount = 0
io.on('connection', (socket) => {
    console.log('---------------- STARTED!');

    socket.broadcast.emit('SendUserMsg', {
        msg : 'A user has been joined!',
        joinedDateTime : new Date().getTime()
    }) //this emits to all except the current user
    
    socket.on('MessageSent', (msg, callback)=>{
        const filter = new Filter()
        if(filter.isProfane(msg)){ //returns true is anything bad found.
            return callback('Profanity not allowed')
        }
        socket.broadcast.emit('MessageReceived', msg)
        callback('Message is delivered.') //runs the callback which is received in the place where this event was called
    })

    socket.on('disconnect', ()=>{
        io.emit('SendUserMsg', 'A user has been left!')
    })
});



