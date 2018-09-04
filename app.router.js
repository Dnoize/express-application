const Express = require('express');
const Router = Express.Router();
const PageController = require(`${process.cwd()}/controllers/page`);

Router
    .route('/')
    .get(PageController.index);


module.exports = Router;