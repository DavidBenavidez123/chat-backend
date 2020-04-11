const express = require('express');
const router = express.Router();
const db = require('../database/dbConfig')

router.get('/room', (req, res) => {
    db('room_messages')
        .join('messages', 'messages.room_id', 'room_messages.room_id')
        .then(messages => {
            messages.reverse()
            res.send(messages)
        })
        .catch(err => {
            res.send({ err })
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


module.exports = router;