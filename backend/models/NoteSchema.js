const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {type: String},
    bodynote: {type: String}
});

const Notes = mongoose.model("Notes", noteSchema);

module.exports = Notes