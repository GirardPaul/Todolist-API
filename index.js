const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/todolist', { useNewUrlParser: true, useUnifiedTopology: true,  autoIndex: true});

var db = mongoose.connection;

!db ? console.log("Error connecting db") : console.log("Db connected successfully")

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));