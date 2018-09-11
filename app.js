const Express = require('express');
const I18n = require('i18n');
const CookieParser = require('cookie-parser');
const Router = require('./app.router');
const Errorhandler = require('./helpers/error-handler');
const Engine = require('express-hbs');
const HBSHelpers = require('./helpers/hbs-helpers');
const Mongoose = require('mongoose');
require('dotenv').config({path: './variables.env'});
//const Promisify = require('es6-promisify');
//const NodeNotifier = require('node-notifier')

const app = Express();


/**
 * Configure db via Mongoose
 */
Mongoose.Promise = global.Promise;

//------------Connexion

Mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true }, (error) => {
    if(error) throw error;
    console.log('Mongo is now connected to our system please request away.')
});



app.engine('hbs', Engine.express4({
    partialsDir : `${__dirname}/views/partials`,
    defaultLayout : `${__dirname}/views/layouts/default.hbs`,
}));

app.set('view engine', 'hbs');

HBSHelpers.registerHelpers(Engine);

/**
 * Configure i18n module
 */
I18n.configure({
    locales:['fr', 'en'],
    cookie : 'movies-app-locales',
    directory: __dirname + '/locales'
});

app.use(Express.static('public'))


/**
 * Expose cookies on req.cookies
 */
app.use( CookieParser())


/**
 * Set i18n middleware on app
 */
app.use(I18n.init)

/**
 * Set Router on "/"
 */
app.use('/', Router)


/**
 * 
 */
module.exports = app

