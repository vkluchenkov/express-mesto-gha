const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { handleError } = require('./errors/handleError');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

// mock owner
app.use((req, res, next) => {
  req.user = { _id: '625ed31855d3010fcfe5a824' };
  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res) => handleError(
  { res, err: { statusCode: 404, message: 'Такого пути не найдено' } },
));

app.listen(PORT);
