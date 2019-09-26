const socket = require('socket.io-client')('http://localhost:3000')
const repl = require('repl')

let username = null

socket.on('disconnect', () => {
    socket.emit('disconnect')
});

socket.on('connect', () => {
    console.clear()
    console.log('start chatting !\n')
    username = process.argv[2]
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