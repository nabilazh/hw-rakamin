const axios = require('axios');
const fs = require('fs');

const apiUrl = 'https://gist.github.com/291dcd64a10ff8c19f6b8b74107c85e2.git';
const logFileName = 'log.txt';

// Mengambil data dari URL dan menulisnya ke dalam file log.txt
async function fetchDataAndWriteToFile() {
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    // Menulis data ke dalam file log.txt
    fs.writeFile(logFileName, JSON.stringify(data, null, 2), (err) => {
      if (err) throw err;
      console.log('Data berhasil ditulis ke dalam file log.txt.');
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Memanggil fungsi untuk mengambil data dan menulisnya ke dalam file
fetchDataAndWriteToFile();
