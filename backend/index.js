 const createErrors = require('http-errors');
 const express = require('express');
 const logger = require('morgan');
 const bodyParser = require('body-parser');

 const http = require('http');
 const app = express();


 app.use(logger('dev'));

 app.use(bodyParser.json());

 app.use(bodyParser.urlencoded({extended:false}));

//Models
var models = require('./models');
//Sync DB
models.sequelize.sync().then(function(){
    console.log('Database OK!');
}).catch(function(err){
    console.log(err, "Something went wrong with the Database Update!");
});

//Custom routes
require('./server/routes')(app);
 app.get('*',(req,res)=> res.status(200).send({message: 'Hello Server'}));

 const port = parseInt(process.env.PORT,10) || 8000;

 app.set('port',port);

 const server = http.createServer(app);

 server.listen(port);

 module.exports = app;
