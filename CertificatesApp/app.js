var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var exphbs = require('express-handlebars')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var createUserRouter = require('./routes/createUser');
var getUsersRouter = require('./routes/getUsers');
var studentsRouter = require('./routes/students');
var createStudentRouter = require('./routes/createStudent');
var getStudentsRouter = require('./routes/getStudents');
var certificatesRouter = require('./routes/certificates');
var createCertificateRouter = require('./routes/createCertificate');
var getCertificateTypesRouter = require('./routes/getCertificateTypes');
var getCertificatesRouter = require('./routes/getCertificates');
var getTagsRouter = require('./routes/getTags');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs());
app.set('view engine', 'hbs');

app.use(logger('dev'));
/* app.use(express.json());
app.use(express.urlencoded({ extended: false })); */

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 5000000
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/createUser', createUserRouter);
app.use('/getUsers', getUsersRouter);
app.use('/students', studentsRouter);
app.use('/createStudent', createStudentRouter);
app.use('/getStudents', getStudentsRouter);
app.use('/certificates', certificatesRouter);
app.use('/createCertificate', createCertificateRouter);
app.use('/getCertificateTypes', getCertificateTypesRouter);
app.use('/getCertificates', getCertificatesRouter);
app.use('/getTags', getTagsRouter);

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
