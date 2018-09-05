const Express = require('express');
const I18n = require('i18n');
const CookieParser = require('cookie-parser');
const Router = require('./app.router');
const Errorhandler = require('./helpers/error-handler');
const Engine = require('express-hbs');
const HBSHelpers = require('./helpers/hbs-helpers');
//const Dotenv = require('dotenv');
//const Promisify = require('es6-promisify');
//const Mongoose = require('mongoose');
//const NodeNotifier = require('node-notifier')

const app = Express();


/**
 * Configure i18n module
 */
I18n.configure({
    locales:['fr', 'en'],
    cookie : 'movies-app-locales',
    directory: __dirname + '/locales'
});

app.engine('hbs', Engine.express4({
    //partialsDir : `${__dirname}/views/partials`,
    //defaultLayout : `${__dirname}/views/layouts/default.hbs`,
}));

app.set('view engine', 'hbs');

HBSHelpers.registerHelpers(Engine);


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

