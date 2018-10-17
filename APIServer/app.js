var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var fs = require('fs');
var conf = require('./conf');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api/index');

var apiHeaderRouter = require('./routes/api/header');
var apiListRouter = require('./routes/api/apiList');
var apiResponseTimeRouter = require('./routes/api/response-time');
var apiSignIn = require('./routes/api/sigin-in');
var apiUrls = require('./routes/api/urls');
var apiScenarios = require('./routes/api/scenarios');
var apiLatency = require('./routes/api/latency');
var apiError = require('./routes/api/error');
var apiAvgTime = require('./routes/api/avgTime');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (!fs.existsSync(conf.logDir)) {
    fs.mkdirSync(conf.logDir);
}
app.use(logger({
    format: 'dev',
    stream: fs.createWriteStream(conf.logDir + '/app.log', {'flags': 'w'})
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1', apiRouter);

app.use('/api/header', apiHeaderRouter);
app.use('/api/apiList', apiListRouter);
app.use('/api/response-time', apiResponseTimeRouter);
app.use('/api/v1/sign-in/', apiSignIn);
app.use('/api/v1/urls/', apiUrls);
app.use('/api/v1/scenarios', apiScenarios);
app.use('/api/v1/latency', apiLatency);
app.use('/api/v1/error', apiError);
app.use('/api/v1/avgtime', apiAvgTime);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
