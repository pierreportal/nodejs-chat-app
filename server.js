const http = require('http').createServer();
const io = require('socket.io')(http)

http.listen(3000, () => console.log('listening on port 3000'));

io.on('connection', socket => {
    console.log('connection...');
    socket.on('message', e => {
        // console.log(e)
        socket.broadcast.emit('message', e)
    });
});

io.on('disconnect', () => {
    console.log('disconnection.')
});