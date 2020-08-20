const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const express = require('express')
const server = express()

.use(express.static('public'))
.use((req, res) => res.sendFile(INDEX, { root: __dirname }))
.listen(PORT, () => console.log(`Listening on ${PORT}`))

const io = require('socket.io')(server);

const users = {}


io.on('connection',socket => {
    socket.on('newUser', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected',name)
    })
    socket.on('send-message', msg =>{
        socket.broadcast.emit('message' , {message: msg, name: users[socket.id]})
    })
    socket.on('disconnect', () =>{
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
})