const express = require("express");

const router = express.Router();

const userRoute = require("../routes/user");
const messageRoute = require('../routes/messages')
const roomsRoute = require('../routes/rooms')

router.use("/user", userRoute);
router.use("/message", messageRoute);
router.use("/rooms", roomsRoute);

router.get("/", (req, res) => {
    res.send("API works.");
});

module.exports = router;