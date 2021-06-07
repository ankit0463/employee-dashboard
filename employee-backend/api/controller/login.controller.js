var jwt = require('jsonwebtoken');
var secretKey = 'employee';

var user = {
    username: 'employee',
    password: 'employee@eds'
}

module.exports = {
    login: function(req, res) {
        var { username, password } = req.body;

        if (!username || !password || user['username'] !== username || user['password'] !== password) {
            return res.status(400).send({ message: 'Username or password is incorrect' });
        }

        var token = jwt.sign({ username }, secretKey, {
            algorithm: 'HS256',
            expiresIn: 5 * 60,
        });

        res.status(200).send({'token': token})
    }
}