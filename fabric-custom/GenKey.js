// GenKey.js
// Sinh business key pair cho Trường đại học
// Dùng curve TNM5224 (business-layer)

const fs = require('fs');
const ec = require('./tnm5224');

// ===============================
// 1. Sinh keypair
// ===============================
const keyPair = ec.genKeyPair();

// ===============================
// 2. Lấy private & public key
// ===============================
const privateKeyHex = keyPair.getPrivate('hex');
const publicKeyHex = keyPair.getPublic('hex');

// ===============================
// 3. Lưu key ra file (THỰC TẾ)
// ===============================

// ⚠️ Private key: lưu bảo mật (KHÔNG commit Git)
fs.writeFileSync(
  './keys/truongA_private.key',
  privateKeyHex,
  { mode: 0o600 } // chỉ owner đọc/ghi
);

// Public key: có thể công bố
fs.writeFileSync(
  './keys/truongA_public.key',
  publicKeyHex
);

// ===============================
// 4. Log để demo (KHÔNG dùng production)
// ===============================
console.log('=== BUSINESS KEY GENERATED ===');
console.log('Private key (KEEP SECRET):', privateKeyHex);
console.log('Public key:', publicKeyHex);

module.exports = {
  privateKeyHex,
  publicKeyHex
};
