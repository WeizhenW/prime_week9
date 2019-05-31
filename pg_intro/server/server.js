//require express and create an instance of the express app
const express = require('express');
const app = express();
//require bodyParser
const bodyParser = require('body-parser');
const PORT = 5000;
//need to 'npm install pg' from the command line first - in order not to break the nodemon => command +tab to open a new command line window
//this will add a new dependency to package.json
//require pg for config to work => to connect to the database
const pg = require('pg');
//create a pool of connections to our database (Pool is a class of pg)
const Pool = pg.Pool; 
//user bodyParser
app.use(bodyParser.urlencoded({extended: true}));
//use static files
app.use(express.static('server/public'));

//provide the info to connect to the database
const config = {
    database: 'music_library',
    host: 'localhost',
    port: 5432,// the port postgres running on (not the postico - only the GUI)
}

const pool = new Pool(config); // create a new pool to our database
//const pool = new require('pg).Pool(config)

//get request: send a query to get all songs from the songs table in database and send back the array
app.get('/songs', (req, res) => {
    //make a select query from the database 
    //SELECT * FROM "songs"
    pool.query('SELECT * FROM "songs";')
        .then((result) => { //response from the query above
            //result is a massive obj where the rows is one property inside, additional properties like Fields, rowCount ...
            res.send(result.rows) //send only the rows property of the result object
        }). catch((error) => {
            //catch the error if the above code doesn't work
            console.log('error with SELECT songs query', error); 
            res.sendStatus(500); //400 client mistake 500 server error => you don't want to send the error back to client side due to security reason
        })
})

app.post('/songs', (req, res) => {
    //INSERT INTO "songs" (columns) VALUES
    pool.query(
        //insert to the columns, use $1, $2...  to refer to the columns
        `INSERT INTO "songs" ("rank", "track", "artist", "published") 
        VALUES($1, $2, $3, $4);`, 
        [req.body.rank, req.body.track, req.body.artist, req.body.published]) //the actual location where the value will be added - pg sanitize the data

    .then(() => {
        //send back success status
        res.sendStatus(201);
    }).catch((error) => {
        //catch the error if there's any
        console.log('error with insert', error);
        //and send back status
        res.sendStatus(500);
    }
    )
});

//route to delete
app.delete('/songs/:id', (req, res) => {
    pool.query(`
    DELETE FROM "songs" WHERE "id"=$1;
    `, [req.params.id]).then(
        () => {
            res.sendStatus(200);//204 - no response to send back
        }
    ).catch(
        error => {
            console.log('error with delete song query ', error);
            res.sendStatus(500);
        }
    )
})

//put route
app.put('/songs/:id', (req, res) => {
    pool.query(`
    UPDATE "songs" SET "artist"='Ally' WHERE "id"=$1;
    `, [req.params.id]).then(
        () => {
            res.sendStatus(201);
        }
    ).catch(
        error => {
            console.log(error);
            res.sendStatus(500);
        }
    )
})


app.listen(PORT, () => {
    console.log('in port', PORT);
});