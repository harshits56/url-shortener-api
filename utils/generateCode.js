const crypto = require('crypto');

const generateCode = () => {
    return crypto.randomBytes(4).toString('hex');
}

module.exports = generateCode;