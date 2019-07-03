const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    user: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    }
});

userSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

const User = mongoose.model('Users', userSchema);

module.exports = User