require('dotenv').config()
const socket = require('socket.io-client')(`http://localhost:3000`)
const repl = require("repl")
const chalk = require('chalk');

let username = null

// CONNECT SOCKET
socket.on('connect', () => {
    console.clear()
    process.stdout.write(chalk.inverse('start chatting !\n'))
    const [, , name] = process.argv
    username = name
    socket.send({ type: 'program', msg: 'is connected', username })
});



// RECEIVE MSG
socket.on('message', data => {
    const { type, msg, username } = data
    const res = chalk.italic.magenta(username + ' ~ ') + msg.split('\n')[0]
    type === 'program' ? console.log(chalk.inverse.magenta(res)) : console.log(res)
    // console.log('--->', chalk.italic.magenta(username + ' ~'), msg.split('\n')[0])
});

// DISCONNECT
socket.on('disconnect', () => {
    socket.emit('disconnect')
    // socket.send({ type: 'program', msg: 'left', username })
    // console.log('OUPS')
});

// START PROMPT

repl.start({
    prompt: '',
    eval: msg => {
        socket.send({ msg, username })
        // console.clear()
    }
})