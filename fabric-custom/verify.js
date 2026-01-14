// verify.js
// Xác thực bảng điểm bằng curve TNM5224 (off-chain)

const fs = require('fs');
const crypto = require('crypto');
const ec = require('./tnm5224');

function verifyTranscript(pdfPath, payload) {
  const { hash, signature, publicKey } = payload;

  // 1) đọc file
  const pdfBuffer = fs.readFileSync(pdfPath);

  // 2) hash lại
  const hashCheck = crypto.createHash('sha256').update(pdfBuffer).digest('hex');

  if (hashCheck !== hash) {
    return false; // nội dung bị thay đổi
  }

  // 3) verify chữ ký
  const key = ec.keyFromPublic(publicKey, 'hex');
  return key.verify(Buffer.from(hash, 'hex'), signature);
}

module.exports = verifyTranscript;
