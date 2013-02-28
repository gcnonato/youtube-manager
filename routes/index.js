
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Youtube Url Manager'}); //, _template: '<div> <%= url %> <%= status %> </div>' });
};
