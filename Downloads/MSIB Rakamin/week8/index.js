const express = require('express');
const pg = require('pg');
const app = express();
const PORT = 3000;

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dvdrental',
  password: '123',
  port: 5432,
});

app.get('/films', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM film');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/films/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM film WHERE film_id = $1', [id]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM category');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/films/category/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM film WHERE category_id = $1', [categoryId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
