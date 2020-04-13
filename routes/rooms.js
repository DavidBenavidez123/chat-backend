const express = require('express');
const router = express.Router();
const db = require('../database/dbConfig')

router.get('/room/:room', (req, res) => {
    console.log(req.params)
    db('rooms')
        .where('name', req.params.room)
        .then(id => {
            console.log(id[0])
            const room_id = id[0].room_id
            db('room_messages')
                .where('room_id', room_id)
                .join('users', 'users.users_id', 'room_messages.users_id')
                .select('username')
                .then(data => {
                    res.send(data)
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            console.log(err)
        })
})



router.get('/rooms', (req, res) => {
    db('rooms')
        .then(rooms => {
            res.send(rooms)
        })
        .catch(err => {
            res.send({ err })
        })
})

router.post('/add', (req, res) => {
    const name = req.body
    db('rooms')
        .insert(name)
        .then(rooms => {
            res.send(rooms)
        })
        .catch(err => {
            res.send({ err })
        })
})


module.exports = router;