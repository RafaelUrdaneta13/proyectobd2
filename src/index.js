//dependencias
const express = require('express');
const morgan = require('morgan');
const exhbs = require('express-handlebars')
const path = require("path");
//const flash = require("connect-flash");
//const bodyParser = require("body-parser");

//initializations

const app= express();



//settings
app.set('port', process.env.PORT || 4000);
app.set('appName', 'Proyecto');
app.set("views", path.join(__dirname, 'views'));
app.engine('.hbs', exhbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars') 
}));
app.set('view engine', '.hbs');



//middlewares

app.use(morgan('dev'));

app.use(express.urlencoded({extended: false}));

app.use(express.json);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//GLOBAL VARIABLES
app.use(function(req, res, next){
    console.log('request url: ' + req.url);
    next();
   })
   
//rutas
app.use(require('./routes/'));
app.use('/Sedes', require('./routes/sede.js'));


//public
app.use(express.static(path.join(__dirname, "public")));

//para mensajes de error
app.use(flash());

//servidor puerto
app.listen(app.get('port'), ()=>{
    console.log('servidor escuchando', app.get('port') );
    console.log('Nombre de la App:', app.get('appName'));    
});

//exportacion
module.exports = app;