const io = require('socket.io')(4000);

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