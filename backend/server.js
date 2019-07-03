const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_uri;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Conexão feita");
}); 

const notesRouter = require('./routes/notes')
const usersRouter = require('./routes/users')

app.use('/users', usersRouter);
app.use('/notes', notesRouter);

app.listen(port, () => {
    console.log("Server running");
});