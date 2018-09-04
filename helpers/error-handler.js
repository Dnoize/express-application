const Fs = require ('fs')
const Notifier = require('node-notifier')

/**
 * 
 * @param {*} err 
 * @param {*} str 
 * @param {*} req 
 */
exports.log= (err, str, req) =>{
    let message = 'Error in' + req.method + ' ' + req.url + ' : ' + str + '\n';
    Fs.appendFileSync(`${process.cwd()}/log/errors.txt`, message)
}


/**
 * Display error in desktop notification
 * 
 * @param {*} err 
 * @param {*} str 
 * @param {*} req 
 * 
 * @requires libnotify-bin
 */
exports.notify = (err, str, req) => {
    let title = 'Error in ' + req.method + ' ' + req.url;
    Notifier.notify({
        title : title,
        message : str
    })
}