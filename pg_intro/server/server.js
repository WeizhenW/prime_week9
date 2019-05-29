const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;

let songs = [];

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('server/public'));


app.get('/songs', (req, res) => {
    res.send(songs);
})


app.listen(port, () => {
    console.log('in port', port);
});