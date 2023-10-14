const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const winston = require('winston');
const bcrypt = require('bcryptjs');
const users = [];

const db = require('./db');
const app = express();
app.use(bodyParser.json());

// Impor routers
const moviesRouter = require('./movies');
app.use('/movies', moviesRouter);

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Akses ditolak.');
  
    jwt.verify(token, 'halo', (err, user) => {
      if (err) return res.status(403).send('Token tidak valid.');
      req.user = user;
      next();
    });
  };

// Registrasi Pengguna
app.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Enkripsi kata sandi sebelum disimpan
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // menyimpan pengguna ke dalam database (array users)
      users.push({ username, password: hashedPassword });
  
      res.status(201).send('Pengguna berhasil terdaftar!');
    } catch (error) {
      res.status(500).send('Terjadi kesalahan saat mendaftar pengguna.');
    }
  });

// Login Pengguna
app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Cari pengguna berdasarkan username
      const user = users.find(user => user.username === username);

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Username atau kata sandi salah.');
      }
  
      // token JWT untuk pengguna yang berhasil login
      const token = jwt.sign({ username }, 'halo', { expiresIn: '1h' });
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).send('Terjadi kesalahan saat login pengguna.');
    }
  });
  
// Endpoint untuk mendapatkan data users dengan pagination
app.get('/users', authenticateToken, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const offset = (page - 1) * limit;

    const { rows } = await pool.query('SELECT * FROM users OFFSET $1 LIMIT $2', [offset, limit]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users from database:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint untuk dokumentasi Swagger UI
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Movie API',
        version: '1.0.0',
        description: 'RESTful API for movies and users',
      },
      servers: [
        { url: 'http://localhost:3000', description: 'Development server' },
      ],
    },
    apis: ['./index.js'], 
  };

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware logging server
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
  });

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.listen(3000, () => {
  console.log('Server berjalan pada port 3000');
});
