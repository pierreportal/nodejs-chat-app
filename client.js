require('dotenv').config()
const socket = require('socket.io-client')(`http://localhost:3000`)
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let username = null

// CONNECT SOCKET
socket.on('connect', () => {

    startChat()
});

const startChat = () => {
    console.clear()
    console.log('start chatting !')

    const [, , name] = process.argv

    username = name
}

// RECEIVE MSG
socket.on('message', data => {

    const { msg, username } = data

    console.log(`${username} ~ ${msg.split('\n')[0]}`)
});

// ERRORS
socket.on('error', (err) => {

    console.log('OUPS', err)
});

// DISCONNECT
socket.on('disconnect', () => {

    socket.emit('disconnect')
    // console.log('OUPS')
});

// START PROMPT

rl.question("", msg => {
    socket.send({ type: 'msg', msg, username })
    console.clear();
});