const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
app.use(bodyParser.json());
const pool = require('./db'); 


// movies --

// endpoint mendapatkan semua data movies
app.get('/api/movies', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM movies');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// endpoint mendapatkan data movie berdasarkan ID
app.get('/api/movies/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM movies WHERE id = $1', [id]);
        if (rows.length === 0) {
            res.status(404).json({ error: 'Movie not found' });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// endpoint menambahkan data movie baru
app.post('/api/movies', async (req, res) => {
    const { title, genres, year, photo } = req.body;
    try {
        const { rows } = await pool.query(
            'INSERT INTO movies (title, genres, year, photo) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, genres, year, photo]
        );
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// endpoint memperbarui data movie berdasarkan ID
app.put('/api/movies/:id', async (req, res) => {
    const { id } = req.params;
    const { title, genres, year, photo } = req.body;
    try {
        const { rows } = await pool.query(
            'UPDATE movies SET title = $1, genres = $2, year = $3, photo = $4 WHERE id = $5 RETURNING *',
            [title, genres, year, photo, id]
        );
        if (rows.length === 0) {
            res.status(404).json({ error: 'Movie not found' });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// endpoint menghapus data movie berdasarkan ID
app.delete('/api/movies/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('DELETE FROM movies WHERE id = $1 RETURNING *', [id]);
        if (rows.length === 0) {
            res.status(404).json({ error: 'Movie not found' });
        } else {
            res.json({ message: 'Movie deleted successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// user --

// endpoint mendapatkan semua data users
app.get('/users', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// endpoint mendapatkan data users by ID
app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// endpoint menambahkan data user
app.post('/users', async (req, res) => {
  const { email, gender, password, role } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO users (email, gender, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, gender, password, role]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// endpoint memperbarui data user by ID
app.put('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const { email, gender, password, role } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE users SET email = $1, gender = $2, password = $3, role = $4 WHERE id = $5 RETURNING *',
      [email, gender, password, role, userId]
    );
    if (rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// endpoint menghapus data user by ID
app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const { rows } = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ message: 'User deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = app;
