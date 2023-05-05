/* экспортируем модель со схемой в контроллер */
const User = require('../models/user');

const createUser = (req, res) => {

  const { name, email } = req.body;

  User.create({ name, email })
  .then((newUser) => {
    res.send(newUser);
  })
  .catch((err) => {
    res.send(err);
  })
}

module.exports = {
  createUser
}