const express = require("express");

const authMW = require("../middleware/authMW");
const renderMW = require("../middleware/renderMW");
const getCommentsByUserMW = require("../middleware/getCommentsByUser");
const getUserById = require("../middleware/getUserById");

const router = express.Router();

router.get("/:user_id",
    authMW(),
    getCommentsByUserMW(),
    getUserById(),
    renderMW("../views/pages/user.ejs")
);


module.exports = router;