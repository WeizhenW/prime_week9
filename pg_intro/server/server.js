const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;
//need to 'npm install pg' from the command line first
//in order not to break the nodemon => command +tab to open a new command line window
//this will add a new dependency to package.json
//pg for config to work => to connect to the database
const pg = require('pg');
const Pool = pg.Pool; //create a pool of connections to our database (Pool is a class of pg)

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

//connect to the database
const config = {
    database: 'music_library',
    host: 'localhost',
    port: 5432,// the port postgres running on (not the postico)
}

const pool = new Pool(config); // create a new pool to our database
//const pool = new require('pg).Pool(config)


app.get('/songs', (req, res) => {
    //make a select query from the database 
    //SELECT * FROM "songs"
    pool.query('SELECT * FROM "songs";')
        .then((result) => { //response from the query above
            //result => a massive obj where the rows is one property inside, additional properties like Fields, rowCount ...
            console.log(result);
            res.send(result.rows)
        }). catch((error) => {
            console.log('error with SELECT songs query', error); 
            res.sendStatus(500); //400 client mistake 500 server error => you don't want to send the error back to client side due to security reason
        })
    //.then after the query is complete, res.send
})

app.post('/songs', (req, res) => {
    //INSERT INTO "songs" (columns) VALUES
    res.sendStatus(201);
})


app.listen(PORT, () => {
    console.log('in port', PORT);
});