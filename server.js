const chalk = require('chalk');

const http = require('http').createServer((req, res) => {
    res.write('connected');
    res.end();
}).listen(3000, () => console.log('listening on port 3000'));

const io = require('socket.io')(http)

// CONNECT
io.on('connection', socket => {
    console.log(chalk.blue('Connection...'));

    // RECEIVE ~ BROADCASTING
    socket.on('message', data => {

        socket.broadcast.emit('message', data);

    });

    // DISCONNECT
    socket.on('disconnect', () => {

        socket.broadcast.emit('message', { type: 'program', content: `partner left` })

        console.log(chalk.red('Disconnection.'));
    });
});