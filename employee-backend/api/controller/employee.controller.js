var fs = require('fs');
var jwt = require('jsonwebtoken');
var dataFilePath = './api/data/employees.json';
var secretKey = 'employee';

module.exports = {
    getAllEmployees: function (req, res) {
        var bearerHeader = req.headers['authorization'];
        if (!bearerHeader) {
            res.sendStatus(403)
        } else {
            var token = bearerHeader.split(' ')[1];
            jwt.verify(token, secretKey, function(err, decoded){
                if(!err){
                    fs.readFile(dataFilePath, 'utf8', (err, data) => {
                        if (err) {
                            res.status(400).send(results);
                        }
            
                        data = JSON.parse(data)
                        var results = [];
                        if (Object.keys(req.query) && req.query.q !== undefined){
                            data.forEach(element => {
                                var pattern = '^' + req.query.q;
                                var regex = new RegExp(pattern, 'gi');
                                if(element.preferredFullName.search(regex) !== -1) {
                                    results.push(element);
                                }
                            });
                        } else {
                            results = data;
                        }
                
                        res.status(200).send(results);
                    });
                } else {
                    if(err.name === 'TokenExpiredError') {
                        res.status(401).send(err);
                    } else {
                        res.status(400).send(err);
                    }
                }
            })
        }
        
    }
};