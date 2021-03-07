var Note = require('../models/note.model.js');

exports.create = function(req, res) {

    if(!req.body.content) {
        res.status(400).send({message: "A nota não pode estar vazia"});
    }
    // criando e salvando nova nota
    var note = new Note({title: req.body.title || "Nota sem título", content: req.body.content});
    //na hora de salvar a nota, se der algum erro retorna a msg, caso contrario salva no bd
    note.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Ocorreu um erro ao criar a nota."});
        } else {
            res.send(data);
        }
    });
};
    //retorna todas as notas do banco de dados
exports.findAll = function(req, res) {

    Note.find(function(err, notes){
        if(err) {
            res.status(500).send({message: "Ocorreu um erro ao recuperar as notas."});
        } else {
            res.send(notes);
        }
    });
};
    //encontre uma nota especifica através de um ID
exports.findOne = function(req, res) {

    Note.findById(req.params.noteId, function(err, data) {
        if(err) { //se der erro, é pq nao existe ID no bd
            res.status(500).send({message: "O ID informado é inválido!"});
        } else {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({message: "Não foi possível encontrar nota com id " + req.params.noteId});
            }
        }
    });
};

exports.update = function(req, res) {
    // atualizar nota atraves do ID
    Note.findById(req.params.noteId, function(err, note) {
        if(err) {//se nao encontrar o ID,exibe msg
            res.status(500).send({message: "Não foi possível encontrar uma nota com id " + req.params.noteId});
        }
    //se encontrar ID,vai atualizar o bd com novos dados
        note.title = req.body.title;
        note.content = req.body.content;
    //salvando atualizacoes
        note.save(function(err, data){
            if(err) {
                res.status(500).send({message: "\n" +
                        "Não foi possível atualizar a nota com id " + req.params.noteId});
            } else {
                res.send(data);
            }
        });
    });
};
//deleta nota com ID especifico
exports.delete = function(req, res) {

    Note.remove({_id: req.params.noteId}, function(err, data) {
        if(err) {
            res.status(500).send({message: "Não foi possível excluir a nota com id " + req.params.id});
        } else {
            res.send({message: "Nota excluída com sucesso!"})
        }
    });
};

