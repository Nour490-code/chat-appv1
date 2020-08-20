const socket = io();
const form = document.getElementById('send-container');
const input = document.getElementById('message-input');
const container = document.getElementById('message-container');

const name = prompt('Please enter your name')
appendMsg('You Joined')
socket.emit('newUser',name)

socket.on('message', data =>{
    appendMsg(`${data.name}: ${data.message}`)
    console.log(data)
})
socket.on('user-connected', name =>{
    appendMsg(`${name} Connected`)
}) 
socket.on('user-disconnected',name => {
    appendMsg(`${name} Disconnected`)
})


form.addEventListener('submit', e =>{
    e.preventDefault()
    const msg = input.value;
    appendMsg(`You: ${msg}`)
    socket.emit('send-message', msg);
    input.value = ''
})

function appendMsg(message){
    const messageElem = document.createElement('div');
    messageElem.innerText = message;
    container.append(messageElem)
}