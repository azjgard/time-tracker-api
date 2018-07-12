const bcrypt = require('bcryptjs');

const hashPassword = password => bcrypt.hashSync(password, 8);

module.exports = {hashPassword};
