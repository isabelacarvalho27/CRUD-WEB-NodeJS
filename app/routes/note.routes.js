module.exports = function(app) {

    var notes = require('../controllers/note.controller.js');

    // Criar nova nota
    app.post('/notes', notes.create);

    // Buscando todas as notas do bd
    app.get('/notes', notes.findAll);

    // Buscando uma nota especifica inserindo o ID
    app.get('/notes/:noteId', notes.findOne);

    // Atualizando uma nota inserindo o ID
    app.put('/notes/:noteId', notes.update);

    // Deletando uma nota inserindo o ID
    app.delete('/notes/:noteId', notes.delete);
}