const csv = require('./csv');

const uploadCsv = csv.uploadcsv;

const arr = uploadCsv();

module.exports.home = function(req,res){
    return res.render('home', {
        files:arr
    });
}