
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express'}); //, _template: '<div> <%= url %> <%= status %> </div>' });
};
