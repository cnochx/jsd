let createError = require('http-errors');
let express = require('express');
let favicon = require('serve-favicon');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let lessMiddleware = require('less-middleware');
let robots = require('express-robots-txt');

// integrates sites
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(lessMiddleware(__dirname + '/public', ));
app.use(lessMiddleware(
    // source
    __dirname + 'public/style',
    // options
    { dest: __dirname + 'public/stylesheets' }, // Destination
    { debug: true }, { compress: 'auto' }
));

app.use(express.static(path.join(__dirname, 'public')));
// Integrate Favicon
app.use(favicon(path.join(__dirname, 'public', '/favicon/favicon.ico')))
    // Integrate Robots.txt on Respond
app.use(robots({ UserAgent: '*', Allow: '/' }))
    // listen to sites
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Integrate Sitemap
const sitemapRouter = require("./routes/sitemap");
app.use("/sitemap.xml", sitemapRouter);
/**
 * TODO: Better Error-Page-Handling
 */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;