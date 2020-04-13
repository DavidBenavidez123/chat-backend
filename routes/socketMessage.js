module.exports = function (io) {
    const db = require('../database/dbConfig')
    io.on('connection', function (socket) {


        socket.on('joining room', function ({ name, room }) {
            socket.join(room)
            const rooms = io.sockets.adapter.rooms
            io.emit('joining room', rooms);

            socket.on('users room', function (obj) {
                const { room, userId } = obj
                db('rooms')
                    .where('name', room)
                    .then(id => {
                        const room_id = id[0].room_id
                        const users_id = userId
                        const userData = { users_id, room_id }
                        db('room_messages')
                            .where({ room_id: room_id, users_id: users_id })
                            .then(data => {
                                if (data === undefined || data.length === 0) {
                                    console.log(userData)
                                    db('room_messages')
                                        .insert(userData)
                                        .then(data => {
                                            console.log('user join', data)
                                            db('room_messages')
                                                .where('room_id', room_id)
                                                .join('users', 'users.users_id', 'room_messages.users_id')
                                                .select('username')
                                                .then(data => {
                                                    io.to(room).emit('users room', data);
                                                })
                                                .catch(err => {
                                                    console.log(err)
                                                })
                                        })
                                        .catch(err => {
                                            console.log(err)
                                        })
                                }
                            })
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })

            socket.on('users leaving room', function (obj) {
                const { room, userId } = obj
                console.log('leaving', obj)

                db('rooms')
                    .where('name', room)
                    .then(id => {
                        const room_id = id[0].room_id
                        const users_id = userId
                        const data = { users_id, room_id }
                        db('room_messages')
                            .where({ room_id: room_id, users_id: users_id })
                            .delete()
                            .then(data => {
                                db('room_messages')
                                    .where('room_id', room_id)
                                    .join('users', 'users.users_id', 'room_messages.users_id')
                                    .select('username')
                                    .then(data => {
                                        io.to(room).emit('users leaving room', data);
                                    })
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })


            socket.on('leaving room', function ({ room }) {
                socket.leave(room)
                const rooms = io.sockets.adapter.rooms
                io.emit('leaving room', rooms);
            })

            socket.on('sending message', function (msg) {
                const { message, username, users_id, room_id } = msg
                const text = { users_id, message, username, room_id }
                db('messages')
                    .insert(text)
                    .then(message => {
                        return db('messages')
                            .where('messages_id', message[0])
                            .then(message => {
                                console.log(message)
                                io.to(room_id).emit('sending message', message[0]);
                            })
                            .catch(err => {
                                io.to(room).emit('sending message', err);
                            })
                    })
                    .catch(err => {
                        io.to(room).emit('sending message', err);
                    })
            })

            socket.on('updating message', function (msg) {
                const message = msg.text
                const messageId = msg.id
                const createdTime = msg.created_at
                console.log(createdTime)
                db('messages')
                    .where('messages_id', messageId)
                    .update({ message: message })
                    .then(text => {
                        io.to(room).emit('updating message', msg);
                    })
                    .catch(err => {
                        io.to(room).emit(err);
                    })
            })
            socket.on('deleting message', function (id) {
                db('messages')
                    .where('messages_id', id)
                    .delete()
                    .then(text => {
                        io.to(room).emit('deleting message', id);
                    })
                    .catch(err => {
                        io.to(room).emit(err);
                    })
            })
            socket.on('adding room', function (room) {
                const name = { name: room }
                db('rooms')
                    .insert(name)
                    .then(name => {
                        return db('rooms')
                            .where('room_id', name[0])
                            .then(name => {
                                console.log(name)
                                io.emit('adding room', name[0]);
                            })
                            .catch(err => {
                                io.to(room).emit('sending message', err);
                            })

                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
        })
    })
};

