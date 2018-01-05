var express = require('express');
var bodyParser = require('body-parser');

// create express app
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
var dbConfig = require('./config/config.js');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url, {
	useMongoClient: true
});

mongoose.connection.on('error', function() {
    console.log('Não conseguiu se conectar a database. Saindo agora ...');
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Conectado a database com sucesso");
})

// define a simple route
app.get('/', function(req, res){
    res.json({"message": "Bem vindo a api de postagens"});
});

require('./app/routes/post.routes.js')(app);

// listen for requests
app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});