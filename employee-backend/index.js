var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var employee = require('./api/controller/employee.controller');
var login = require('./api/controller/login.controller');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

var port = process.env.PORT || 4000;

var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'Welcome!' });
});

router.route('/employee')
.get(function(req, res) {
    employee.getAllEmployees(req, res);
});

router.route('/login')
.post(function(req, res) {
    login.login(req, res);
})

app.use('/api', router);

var server = app.listen(port, () => {
    console.log('listening on port %s...', server.address().port);
});
