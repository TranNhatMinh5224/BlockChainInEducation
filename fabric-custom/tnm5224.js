// tnm5224.js
// Định nghĩa curve elliptic TNM5224 (business-layer)

const EC = require('elliptic').ec; /// Thư viện elliptic
const hash = require('hash.js'); // Thư viện hash

// Khởi tạo curve TNM5224
const ec = new EC({
  type: 'short',

  // Prime field
  p: '00b63c11d43e09b729962d47edb6ddab7a929ed7aa6e7f01da8ca3f72022037373', // p là số nguyên tố an toàn (độ dài 224 bit)

  // Curve equation: y^2 = x^3 + ax + b mod p
  a: '00b63c11d43e09b7729962d47edb6ddab7a929ed7aa6e7f01da8ca3f72022037370',
  b: '009ced8b5e0375c92d55fff25924233e0ca2338392d8c8bcc2d8b42b0fe1418a95',

  // Base point (G) (generator point) điểm sinh G 
  gx: '61fec3112fa5e7aa1779cc56bcf2bdd7326982cc69693bc92908fedf007dffd9',
  gy: '0890dd8c564d7601b0a8e4ce5aba2ad6a3bad24deb8d1e1b6f18d0beb70e1c1d',

  // Order of base point (n) là chu kỳ của điểm G
  n: '00b63c11d43e09b729962d47edb6ddab7ba1a80e44874c71dfbf9419280fa3d971',

  // Cofactor (h) là hệ số đồng bội
  h: '01', 

  // Hash dùng cho ECDSA
  hash: hash.sha256
});

module.exports = ec; // Xuất module ec để sử dụng trong các file khác