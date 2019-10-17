const socket = require('socket.io-client')('http://localhost:3000')
const chalk = require('chalk')
const repl = require('repl')

// const rl = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
// });


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
    // sendBack()
});

repl.start({
    prompt: '',

    eval: msg => {
        socket.send({ ID, type: 'client', content: msg })
    }
});

//#############################
// socket.on('disconnection', () => {
//     console.clear();
//     socket.send({ type: 'program', content: `${ID} left.` })
// });
//#############################

// setTimeout(() => {
//     socket.send({ ID, type: 'client', content: 'timmed message' })
// }, 1000)

// const sendBack = () => {
//     setTimeout(() => {
//         socket.send({ ID, type: 'client', content: 'back' })
//     }, 1000)
// }