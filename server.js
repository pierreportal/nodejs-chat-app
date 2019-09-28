require('dotenv').config()


const http = require('http').createServer((req, res) => {
    res.write('connected');
    res.end();
});

const io = require('socket.io')(http)

http.listen(process.env.PORT, () => console.log('listening on port 3000'));



io.on('connection', socket => {
    console.log('connection...');
    socket.on('message', data => {
        socket.broadcast.emit('message', data);
    });
});



io.on('disconnect', () => {
    console.log('disconnection.')
});