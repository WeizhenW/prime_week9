const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const PORT = 5000;

const pool = require('./modules/pool');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('server/public'));

//get route to display all shoes
app.get('/shoes', (req, res) => {
    pool.query(`
    SELECT * FROM "shoes" ORDER BY "id";
`).then(
    (result) => {
        res.send(result.rows);
    }
).catch(
    error => {
        console.log('error with select', error);
        res.sendStatus(500);
    }
)   
})
//put route to update price
app.put('/shoes', (req, res) => {
    console.log(req.params);
    pool.query(`
        UPDATE "shoes" SET "cost" = $1 WHERE "id" = $2;`,
        [req.body.cost, req.body.id])
        .then(
            () => {
                res.sendStatus(201);
            }
        )
        .catch(
            error => {
                console.log(error);
            }
        )
})

app.listen(PORT, () => {
    console.log('in port', PORT);
})
