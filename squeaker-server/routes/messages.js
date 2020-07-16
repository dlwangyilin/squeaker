const express = require('express');
const router = express.Router({mergeParams: true}); // for getting id params

const {createMessage} = require("../handlers/messages");
// prefix: /api/users/:id/messages
router.route("/").post(createMessage);

module.exports = router;