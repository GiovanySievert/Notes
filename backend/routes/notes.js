const router = require('express').Router();
const note = require('../models/NoteSchema');

router.route('/').get((req, res) => {
    note.find()
    .then(notes => res.json(notes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const bodynote = req.body.bodynote;

  const newNote = new note({
    title,
    bodynote,
  });
  newNote.save()
  .then(() => res.json('note added.'))
  .catch(err => res.status(400).json('error: ' + err));
  
});

router.route('/:id').get((req, res) => {
    note.findById(req.params.id)
    .then(note => res.json(note))
    .catch(err => res.status(400).json('error: ' + err));
});

router.route('/:id').delete((req, res) => {
    note.findByIdAndDelete(req.params.id)
    .then(() => res.json('note deleted.'))
    .catch(err => res.status(400).json('error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  note.findById(req.params.id)
    .then(note => {
      note.title = req.body.title;
      note.bodynote = req.body.bodynote;
      note.save()
        .then(() => res.json('note updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;