const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
 
const app = express();
const port = process.env.PORT || 3001;

 //Bodyparser MiddleWare
app.use(express.json());

//Cors MiddleWare   
app.use(cors());

//URI do banco de dados
const uri = process.env.ATLAS_uri; 

//Conexão com o banco de dados
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Conexão com o banco de dados realizada");
}); 

const notesRouter = require('./routes/notes')
const usersRouter = require('./routes/users')

//Utilizando as Rotas
app.use('/users', usersRouter);
app.use('/notes', notesRouter);


app.listen(port, () => {
    console.log("Servidor Rodando...");
});