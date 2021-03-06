const express = require('express');
const router = express.Router();
const db = require('../database/dbConfig')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

router.get('/', (req, res) => {
    db('messages')
        .orderBy('created_at', 'desc')
        .limit(10)
        .then(messages => {
            messages.reverse()
            res.send({ messages })
        })
        .catch(err => {
            res.send({ err })
        })
})

router.get('/:room/messages', (req, res) => {
    db('rooms')
        .where({ name: req.params.room })
        .then(room => {
            if (room && room.length) {
                return db('messages')
                    .where('room_id', room[0].name)
                    .orderBy('created_at', 'desc')
                    .limit(10)
                    .then(messages => {
                        messages.reverse()
                        res.send({ messages })
                    })
                    .catch(err => {
                        res.send({ err })
                    })
            } else {
                res.json({ room: 'empty' })
            }
        })
        .catch(err => {
            res.send({ err })
        })
})


router.post('/scroll', (req, res) => {
    const { data, room } = req.body
    db('messages')
    .where('room_id', room)
        .orderBy('created_at', 'desc')
        .limit(10)
        .offset(data)
        .then(messages => {
            messages.reverse()
            res.send({ messages })
        })
        .catch(err => {
            res.send({ err })
        })
})

router.put('/update', (req, res) => {
    const { message, messages_id } = req.body
    db('messages')
        .where('messages_id', messages_id)
        .update({ message: message })
        .then(text => {
            return db('messages')
                .where('messages_id', text[0])
                .then(text => {
                    console.log(text[0])
                    res.json('sending message', text[0]);
                })
                .catch(err => {
                    res.json(err);
                })
        })
        .catch(err => {
            res.json(err);
        })
})

function authorizationMiddleware(req, res, next) {
    const authHeader = req.body.headers.Authorization;
    const token = authHeader
    console.log(token)
    if (token) {
        console.log(token)
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                // token verification failed
                res.json({ message: 'invalid token' });
            } else {
                // token is valid
                req.decodedToken = decodedToken; // any sub-sequent middleware of route handler have access to this
                console.log('\n** decoded token information **\n', req.decodedToken);
                next()
            }
        });
    } else {
        res.json({ message: 'no token provided' });
    }
}

module.exports = router


