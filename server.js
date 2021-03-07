var express = require('express');
var bodyParser = require('body-parser');

// create express app
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
console.log(dbConfig);
mongoose.connect(dbConfig.url, {
    useMongoClient : true,
    user : dbConfig.user,
    pass : dbConfig.pass,

});

mongoose.connection.on('error', function(err) {
    console.log('Falha na conexão com o banco de dados.', err);
    process.exit();
});

mongoose.connection.once('open', function() {
    console.log("Sucesso na conexão com o banco de dados.");
})

// define a simple route
app.get('/', function(req, res){
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

require('./app/routes/note.routes.js')(app);


// listen for requests
app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});
