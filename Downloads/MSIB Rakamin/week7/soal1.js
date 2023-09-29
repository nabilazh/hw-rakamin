// soal1.js

const hitung = require('./hitung');

const sisiPersegi = 5;
const panjangPersegiPanjang = 4;
const lebarPersegiPanjang = 6;

const luasPersegi = hitung.luasPersegi(sisiPersegi);
const kelilingPersegi = hitung.kelilingPersegi(sisiPersegi);
const luasPersegiPanjang = hitung.luasPersegiPanjang(panjangPersegiPanjang, lebarPersegiPanjang);
const kelilingPersegiPanjang = hitung.kelilingPersegiPanjang(panjangPersegiPanjang, lebarPersegiPanjang);

console.log(`Luas Persegi: ${luasPersegi}`);
console.log(`Keliling Persegi: ${kelilingPersegi}`);
console.log(`Luas Persegi Panjang: ${luasPersegiPanjang}`);
console.log(`Keliling Persegi Panjang: ${kelilingPersegiPanjang}`);
