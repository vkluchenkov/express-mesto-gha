const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb");

// mock owner
app.use((req, res, next) => {
  req.user = {
    _id: "625ed31855d3010fcfe5a824",
  };

  next();
});

app.use("/users", require("./routes/users"));
app.use("/cards", require("./routes/cards"));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
