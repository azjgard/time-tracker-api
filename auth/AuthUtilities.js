const bcrypt = require('bcryptjs');
// const hashPassword = password => bcrypt.hashSync(password, 8);
// const hashPassword = passord => new Promise((resolve, reject) =>
//   bcrypt.genSalt(10, (err, salt) => )
// )

const genSalt = num =>
  new Promise(resolve => bcrypt.genSalt(num, (err, salt) => resolve(salt)));

const hash = (password, salt) =>
  new Promise(resolve =>
    bcrypt.hash(password, salt, (err, hash) => resolve(hash)),
  );

const hashPassword = password =>
  new Promise(async resolve => {
    const salt = await genSalt(8);
    const hashedPassword = await hash(password, salt);
    resolve(hashedPassword);
  });

module.exports = {hashPassword};
