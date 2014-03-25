
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.form2 = function(req, res){
	res.render('form2', {title: 'Form'});
};