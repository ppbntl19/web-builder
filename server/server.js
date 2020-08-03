require('rootpath')();
var express = require('express');
var ejs = require('ejs');
var app = express();
var compression = require('compression');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var config = require('config.js');
// enable ejs templates to have .html extension
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

// set default views folder
app.set('views', __dirname + '/../client');

// enable gzip compression
app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: config.secret,
    store: new MongoStore({ url: config.connectionString }),
    resave: false,
    saveUninitialized: true
}));

// redirect to the install page if first time running
app.use(function (req, res, next) {
    if (!config.installed && req.path !== '/install') {
        return res.redirect('/install');
    }

    next();
});

// api routes
app.use('/api/contact', require('./controllers/api/contact.controller'));
app.use('/api/pages', require('./controllers/api/pages.controller'));
app.use('/api/posts', require('./controllers/api/posts.controller'));
app.use('/api/redirects', require('./controllers/api/redirects.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));

// make JWT token available to angular app
app.get('/token', function (req, res) { 
    res.send(req.session.token);
});

// standalone pages
if (process.env.enable_install) {
    app.use('/install', require('./controllers/install.controller'));
}
if (process.env.enable_admin_panel) {
    app.use('/login', require('./controllers/login.controller'));
    // admin section
    app.use('/admin', require('./controllers/admin.controller'));
}


// blog front end
app.use('/', require('./controllers/blog.controller'));
//Default
app.use(function(req, res){
    res.redirect('/');
});
// start server
var port = process.env.PORT  ||  3000;
console.log(port, process.env.PORT, process.env)
var server = app.listen(port, function (err) {
    console.log(err)
    console.log('Server listening on port ' + port);
});