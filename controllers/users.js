const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message })); //обработка ошибок
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res
        .status(500)
        .send({ message: "Произошла ошибка при запросе пользователя" })
    ); //обработка ошибок
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() =>
      res
        .status(500)
        .send({ message: "Произошла ошибка при создании пользователя" })
    ); //обработка ошибок
};
