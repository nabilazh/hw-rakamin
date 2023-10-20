const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

// konfig multer untuk menyimpan file di folder 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// middleware untuk mengizinkan CORS 
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// handle POST request untuk mengupload file
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Tidak ada file yang diunggah.');
  }

// menyimpan informasi file ke database atau melakukan operasi lain

  res.status(200).json({
    message: 'File berhasil diunggah.',
    filename: req.file.filename,
    filePath: req.file.path
  });
});

// menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
