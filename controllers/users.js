const { handleError } = require('../errors/handleError');
const NotFoundError = require('../errors/NotFoundError');
const User = require('../models/user');

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users) res.send(users);
    else throw new NotFoundError('Пользователей не найдено');
  } catch (err) {
    handleError({ err, res });
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) res.send(user);
    else throw new NotFoundError('Пользователь не найден');
  } catch (err) {
    handleError({ err, res });
  }
};

module.exports.createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    res.send(user);
  } catch (err) {
    handleError({ err, res });
  }
};

module.exports.updateMe = async (req, res) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (user) res.send(user);
    else throw new NotFoundError('Пользователь не найден');
  } catch (err) {
    handleError({ err, res });
  }
};

module.exports.updateMeAvatar = async (req, res) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (user) res.send(user);
    else throw new NotFoundError('Пользователь не найден');
  } catch (err) {
    handleError({ err, res });
  }
};
