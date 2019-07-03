const router = require('express').Router();
const note = require('../models/NoteSchema');

router.route('/').get((req, res) => {
    note.find()
    .then(notes => res.json(notes))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Rota que adiciona as notas ao banco de dados
router.route('/add').post((req, res) => {
  const title = req.body.title;
  const bodynote = req.body.bodynote;

  const newNote = new note({
    title,
    bodynote,
  });
  newNote.save()
  .then(() => res.json('nota adicionada!'))
  .catch(err => res.status(400).json('error: ' + err));
});

//Rota que captura a nota pelo id
router.route('/:id').get((req, res) => {
    note.findById(req.params.id)
    .then(note => res.json(note))
    .catch(err => res.status(400).json('error: ' + err));
});

//Rota que deleta a nota pelo id
router.route('/:id').delete((req, res) => {
    note.findByIdAndDelete(req.params.id)
    .then(() => res.json('nota deletada.'))
    .catch(err => res.status(400).json('error: ' + err));
});

//Rota que edição da nota pelo id
router.route('/update/:id').post((req, res) => {
  note.findById(req.params.id)
    .then(note => {
      note.title = req.body.title;
      note.bodynote = req.body.bodynote;
      note.save()
        .then(() => res.json('nota editada!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;