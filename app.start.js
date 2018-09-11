const App = require('./app');
require('dotenv').config({path: './variables.env'});

App.listen(process.env.PORT, () => {
    console.log('App listening on port ' +process.env.PORT)
})