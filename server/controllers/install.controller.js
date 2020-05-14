var express = require('express');
var router = express.Router();
var config = require('config.js');
var fs = require("fs");
var userService = require('services/user.service');

router.get('/', function (req, res) {
    return res.render('install/index');
});

router.post('/', function (req, res) {
    if (config.installed) {
        return res.sendStatus(401);
    }

    // create user
    userService.create(req.body)
        .then(function () {
            // return to login page with success message
            req.session.success = 'Installation successful, you can login now.';
            return res.redirect('/login');
        })
        .catch(function (err) {
            return res.render('install/index', { error: err });
        });
});

module.exports = router;