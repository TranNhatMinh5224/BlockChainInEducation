// sign.js
// Ký bảng điểm / bằng cấp bằng curve TNM5224 (business-layer)

const fs = require('fs');
const crypto = require('crypto');
const ec = require('./tnm5224');


// 1. Load PRIVATE KEY của Trường

const PRIVATE_KEY_PATH = './keys/truongA_private.key';

if (!fs.existsSync(PRIVATE_KEY_PATH)) {
  throw new Error('Private key not found. Run GenKey.js first.');
}

const privateKeyHex = fs.readFileSync(PRIVATE_KEY_PATH, 'utf8').trim();
const key = ec.keyFromPrivate(privateKeyHex, 'hex');

// 2. Hàm ký bảng điểm / bằng

function signTranscript(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error('Transcript file not found.');
  }

  // (1) Đọc file (PDF / JSON / bất kỳ binary nào)
  const fileBuffer = fs.readFileSync(filePath);

  // (2) Hash nội dung (BẮT BUỘC với ECDSA)
  const hashBuffer = crypto.createHash('sha256').update(fileBuffer).digest();

  // (3) Ký hash bằng PRIVATE KEY của Trường
  const signature = key.sign(hashBuffer, { canonical: true });

  // (4) Payload chữ ký (đưa lên blockchain / gửi cho SV)
  return {
    algorithm: 'ECDSA',
    curve: 'TNM5224',
    hash: hashBuffer.toString('hex'),
    signature: {
      r: signature.r.toString('hex'),
      s: signature.s.toString('hex')
    },
    publicKey: key.getPublic('hex')
  };
}

// ===============================
// 3. Export
// ===============================
module.exports = signTranscript;
