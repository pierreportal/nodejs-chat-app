require('dotenv').config()
const socket = require('socket.io-client')(`http://localhost:3000`)
const repl = require("repl")
const chalk = require('chalk');

let username = null

// CONNECT SOCKET
socket.on('connect', () => {
    console.clear()
    console.log(chalk.inverse('start chatting !'))
    const [, , name] = process.argv
    username = name
});



// RECEIVE MSG
socket.on('message', data => {

    const { msg, username } = data

    console.log(chalk.italic.magenta(username + ' ~'), msg.split('\n')[0])
});

// DISCONNECT
socket.on('disconnect', () => {

    socket.emit('disconnect')
    // console.log('OUPS')
});

// START PROMPT

repl.start({
    promp: '',
    eval: msg => {
        socket.send({ msg, username })
        console.clear()
    }
})