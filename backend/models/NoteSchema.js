const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Criando o Schema das Notas
const noteSchema = new Schema({
    title: {type: String},
    bodynote: {type: String}
});

const Notes = mongoose.model("Notes", noteSchema);

module.exports = Notes