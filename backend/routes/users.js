const bcrypt = require("bcrypt")
const router = require('express').Router();
const User = require('../models/UserSchema');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const user = req.body.user;
  const password = req.body.password;

  const newUser = new User({user, password});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.post('/auth', (req, res) => {
  const { user, password } = req.body;

  // Simple validation
  if(!user || !password) {
    return res.status(400).json({ msg: 'Por favor, coloque preencha todos os campos' });
  }

  // Check for existing user
  User.findOne({ user })
    .then(user => {
      if(!user) return res.status(400).json({ msg: 'Usuario não existe' });

      // Validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) return res.status(200).json({ msg: 'Password Correto' });
          window.location('/notes') 

        })
    })
});

module.exports = router;