const I18n = require('i18n');

exports.registerHelpers = (hbs) => {
    hbs.registerHelper('__', function(){
        return I18n.__.apply(this,arguments);
    });
};

