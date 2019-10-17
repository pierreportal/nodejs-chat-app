const socket = require('socket.io-client')('http://localhost:3000')
const chalk = require('chalk')
const repl = require('repl')


let ID = null

// CONNECT
socket.on('connect', () => {
    [, , ID] = process.argv;

    console.clear()
    console.log(chalk.blue(`${ID} connected to server...`));
    socket.send({ type: 'program', content: `${ID} is connected.` })
});

socket.on('message', data => {
    const { ID, type, content } = data
    type && type === 'program' ? console.log(`${chalk.red(content)}`) : console.log(`${chalk.magenta(ID)} ~ ${chalk.blue(content)}`)
});

repl.start({
    prompt: '',

    eval: msg => {
        socket.send({ ID, type: 'client', content: msg })
    }
});