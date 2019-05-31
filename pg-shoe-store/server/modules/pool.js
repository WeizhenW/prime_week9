//put the pool in a separate module

const pg = require('pg');
const Pool  = pg.Pool;


const config = {
    database: 'shoe_store',
    host: 'localhost',
    port: 5432
};

module.exports = new Pool(config);