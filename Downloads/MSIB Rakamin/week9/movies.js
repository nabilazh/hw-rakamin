const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const { pool } = require('./db'); 

// Middleware untuk otorisasi menggunakan token JWT
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Akses ditolak.');
  
    jwt.verify(token, 'halo', (err, user) => {
      if (err) return res.status(403).send('Token tidak valid.');
      req.user = user;
      next();
    });
  };

// Endpoint untuk mendapatkan data movies dengan pagination
router.get('/', authenticateToken, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const offset = (page - 1) * limit;

    // Lakukan kueri ke basis data untuk mengambil data movies dengan pagination
    const { rows } = await pool.query('SELECT * FROM movies OFFSET $1 LIMIT $2', [offset, limit]);
    
    res.json(rows);
  } catch (error) {
    console.error('Error fetching movies from database:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint untuk membuat movie baru
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, director, year } = req.body;

    // menambahkan movie baru
    const { rows } = await pool.query('INSERT INTO movies (title, director, year) VALUES ($1, $2, $3) RETURNING *', [title, director, year]);

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating movie:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint untuk mendapatkan semua movies
router.get('/', authenticateToken, async (req, res) => {
  try {
    // mengambil seluruh movies
    const { rows } = await pool.query('SELECT * FROM movies');

    res.json(rows);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint untuk mendapatkan movie berdasarkan ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const movieId = req.params.id;

    // mengambil movie berdasarkan ID
    const { rows } = await pool.query('SELECT * FROM movies WHERE id = $1', [movieId]);

    if (rows.length === 0) {
      return res.status(404).send('Movie not found.');
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint untuk memperbarui movie berdasarkan ID
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const movieId = req.params.id;
    const { title, director, year } = req.body;

    // memperbarui movie berdasarkan ID
    const { rows } = await pool.query('UPDATE movies SET title = $1, director = $2, year = $3 WHERE id = $4 RETURNING *', [title, director, year, movieId]);

    if (rows.length === 0) {
      return res.status(404).send('Movie not found.');
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error updating movie:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint untuk menghapus movie berdasarkan ID
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const movieId = req.params.id;

    // menghapus movie berdasarkan ID
    const { rows } = await pool.query('DELETE FROM movies WHERE id = $1 RETURNING *', [movieId]);

    if (rows.length === 0) {
      return res.status(404).send('Movie not found.');
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;