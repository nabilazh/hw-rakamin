const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../db')

const app = express();
app.use(bodyParser.json());

// Mengonfigurasi Express untuk melayani file statis dari folder 'public'
app.use(express.static('public'));

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

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
