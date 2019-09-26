require('dotenv').config()

const http = require('http').createServer();
const io = require('socket.io')(http)

http.listen(process.env.PORT, () => console.log('listening on port 3000'));

io.on('connection', socket => {
    console.log('connection...');
    socket.on('message', e => {
        socket.broadcast.emit('message', e)
    });
});

io.on('disconnect', () => {
    console.log('disconnection.')
});