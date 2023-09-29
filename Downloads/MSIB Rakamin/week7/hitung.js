// Menghitung luas persegi
exports.luasPersegi = (sisi) => {
    return sisi * sisi;
  };
  
  // Menghitung keliling persegi
  exports.kelilingPersegi = (sisi) => {
    return 4 * sisi;
  };
  
  // Menghitung luas persegi panjang
  exports.luasPersegiPanjang = (panjang, lebar) => {
    return panjang * lebar;
  };
  
  // Menghitung keliling persegi panjang
  exports.kelilingPersegiPanjang = (panjang, lebar) => {
    return 2 * (panjang + lebar);
  };
  