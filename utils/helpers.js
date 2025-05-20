// utils/helpers.js
const fs = require('fs');

function generateRandomEmail() {
  return `user_${Math.random().toString(36).substring(2, 10)}@mail.com`;
}

function saveUser(email, password) {
  fs.mkdirSync('data', { recursive: true });
  fs.writeFileSync('data/testUser.json', JSON.stringify({ email, password }, null, 2));
}

function getUser() {
  const raw = fs.readFileSync('data/testUser.json', 'utf-8');
  return JSON.parse(raw);
}

module.exports = {
  generateRandomEmail,
  saveUser,
  getUser,
};
