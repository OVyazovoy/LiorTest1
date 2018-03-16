var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser());

var KeyList = [];

app.get('/key', function (req, res) {
    if (req.query.keyName) {
        var filteredList = KeyList.filter(function (data) {
            return data.key === req.query.keyName
        });
        return res.send(filteredList);
    }
    return res.send(KeyList);
});

app.post('/key', function (req, res) {
    if (!req.body.key || !req.body.value) {
        return res.status(400).send('Need "key" and "value"')
    }
    KeyList.push({ key: req.body.key, value: req.body.value });
    return res.send(KeyList);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
