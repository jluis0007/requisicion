const express = require('express');
const morgan = require('morgan');
const path = require('path'); //utilizarlo en settings para layouts
const exphbs = require('express-handlebars');
//const session = require('express-session');
//const validator = require('express-validator');
// const passport = require('passport');
// const flash = require('connect-flash');
// const MySQLStore = require('express-mysql-session')(session);
//const bodyParser = require('body-parser');

//const { database } = require('./keys');

// Intializations
const app = express(); // app ES LA APLICACIÓN
//require('./lib/passport');

// Settings
app.set('port', process.env.PORT || 4000); //SI EXISTE UN PUERTO EN EL SISTEMA TOMALO DE LO CONTRARIO 4000
app.set('views', path.join(__dirname, 'views')); //dirname devuelve la direccion actual
app.engine('.hbs', exphbs({
    defaultLayout: 'main', //nombre de la plantilla principal
    layoutsDir: path.join(app.get('views'), 'layouts'), //trae la direccion de la CARPETA VIWES y concatena
    partialsDir: path.join(app.get('views'), 'partials'), //trear donde esta CARPETA PARTIALS y concatena
    extname: '.hbs', //para decirle en que terminaran archivos de handlebars
    helpers: require('./lib/handlebars') //hace el helpers con el archivo handlebars en CARPETA LIB
}));
app.set('view engine', '.hbs'); //PARA VER LO ANTERIOR

// // Middlewares   FUNCIONES QUE SE EJECUTAN CADA VEZ QUE HAY UNA PETICIÓN DEL CLIENTE AL SERVIDOR
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false })); //solo para  aceptar peticiones de datos sencillos, imagenes y otros no
app.use(express.json()); //para que las peticiones puedan mandarse jsons

// app.use(session({
//   secret: 'faztmysqlnodemysql',
//   resave: false,
//   saveUninitialized: false,
//   store: new MySQLStore(database)
// }));
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(validator());

// Global variables
app.use((req, res, next) => {
    // app.locals.message = req.flash('message');
    // app.locals.success = req.flash('success');
    // app.locals.user = req.user;
    next();
});

/****************************************** * ROUTES****************/
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links')); //es para después de links poner ID ej: liks/UVIUHUI  (después de eso es ID)

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server is in port', app.get('port'));
});