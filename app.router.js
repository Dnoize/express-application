const Express = require('express');
const Router = Express.Router();
const PageController = require(`${process.cwd()}/controllers/page`);

Router
    .route('/')
    .get(PageController.index);


Router
    .route('/review/:id')
    .get(PageController.details)

Router
    .route('/reviews')
    .get(PageController.reviews)

    // 4. Définition 
Router
    .route('/reviews/:genre/:year/:page')
    .get(PageController.filter);


module.exports = Router;