// const io = require('socket.io')(8000)
// const port = require('../nodeServer/index');
// const p = process.env.PORT || 8000

// import io from 'socket.io-client'

const endpoint = "https://real-time-chat-aakash.herokuapp.com"


const socket = io(endpoint);

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var audio  = new Audio('ting.mp3');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position === 'left'){
        audio.play();
    };
    
};
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = "";
});

const name = prompt("enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right');
});

socket.on('receive', data =>{
    append(`${data.name} : ${data.message}`, 'left');
});

socket.on('left', name =>{
    append(`${name} left the chat`, 'right');
});