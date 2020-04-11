module.exports = function (io) {
    const db = require('../database/dbConfig')
    io.on('connection', function (socket) {
        console.log('New client connected')
        socket.on('updating message', function (msg) {
            const message = msg.text
            const messageId = msg.id
            const createdTime = msg.created_at
            console.log(createdTime)
            db('messages')
                .where('messages_id', messageId)
                .update({ message: message })
                .then(text => {
                    io.emit('updating message', msg);
                })
                .catch(err => {
                    io.emit(err);
                })
        })
        socket.on('deleting message', function (id) {
            db('messages')
                .where('messages_id', id)
                .delete()
                .then(text => {
                    io.emit('deleting message', id);
                })
                .catch(err => {
                    io.emit(err);
                })
        })

        socket.on('joining room', function ({ room }) {
            socket.join(room)
            socket.on('sending message', function (msg) {
                const { message, username, users_id, room_id } = msg
                const text = { users_id, message, username, room_id }
                db('messages')
                    .insert(text)
                    .then(message => {
                        return db('messages')
                            .where('messages_id', message[0])
                            .then(message => {
                                io.to(room).emit('sending message', message[0]);
                            })
                            .catch(err => {
                                io.to(room).emit('sending message', err);
                            })
                    })
                    .catch(err => {
                        io.to(room).emit('sending message', err);
                    })
            })
        })
    })
};

