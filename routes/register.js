var express = require("express");
const { check, validationResult } = require('express-validator');

const saveUserMW = require("../middleware/saveUserMW");
const redirectMW = require("../middleware/redirectMW");
const getUserByNameMW = require("../middleware/getUserByName");


var router = express.Router();

router.post("/", 
    [
        //check("email").isEmail(),
        check('username').not().isEmpty(),
        check('password').not().isEmpty(),
    ], 
    (req, res, next) => {
        const result = validationResult(req);
        if(result.errors.length == 0){
            return next();            
        }
        return res.redirect("/login?error=invalid_input");
    },
    getUserByNameMW(),
    (req, res, next) => {
        if(res.locals.user != undefined){
            return res.redirect("/login?error=username_taken");
        }
        return next();
    },
    saveUserMW(),
    redirectMW("/login?result=successful_reg"),
);

module.exports = router;
