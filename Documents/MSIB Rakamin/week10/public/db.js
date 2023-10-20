const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'movies_database',
  password: '123',
  port: 5432,
});


pool.connect()
  .then(client => {
    console.log('Connected to the database');
    client.release();
  })
  .catch(err => {
    console.error('Error connecting to the database', err);
  });

  module.exports = pool;