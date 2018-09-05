const I18n = require('i18n');

exports.index = (req,res) => {
    console.log(I18n.__('hello'));
    res.render('index',{})
};