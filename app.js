const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { handleError } = require('./errors/handleError');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res) =>
  handleError({ res, err: { statusCode: 404, message: 'Такого пути не найдено' } })
);

app.use((err, req, res, next) => handleError({ res, err, next }));

app.listen(PORT);
