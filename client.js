require('dotenv').config()
const socket = require('socket.io-client')(`https://socket-io-chatter.herokuapp.com/`)
const repl = require('repl')

let username = null



socket.on('disconnect', () => {
    socket.emit('disconnect')
});

socket.on('connect', () => {
    console.clear()
    console.log('start chatting !\n')
    const [, , name] = process.argv
    username = name
})

socket.on('message', data => {
    const { msg, username } = data
    console.log(`${username} ~ ${msg.split('\n')[0]}\n`)
})

repl.start({
    prompt: '',
    eval: msg => {
        socket.send({ msg, username })
    }
})