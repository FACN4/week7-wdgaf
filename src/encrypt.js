const crypto = require('crypto');

const encrypt = (secret) => {
  if (!secret || typeof secret !== 'string') {
    throw Error('invalid secret!');
  }
  return {
    sign: value => crypto
      .createHmac('sha256', secret)
      .update(value)
      .digest('hex'),
    validate: (value, hash) => {
      const correctHash = this.sign(value);
      return correctHash === hash;
    },
  };
};

module.export = encrypt;
