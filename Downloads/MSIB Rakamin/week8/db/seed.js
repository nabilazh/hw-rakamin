const pool = require('queries.js');
const fs = require('fs');
const seedQuery = fs.readFileSync('./seeding.sql', { encoding: 'utf8' });

pool.query(seedQuery, (err,res) => {
    if(err) {
        throw err;
    }
    console.log('seeding complete..');
    pool.end();
});