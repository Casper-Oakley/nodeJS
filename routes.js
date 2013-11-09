exports.index = function(req, res){
	var iptest = req.connection.remoteAddress;
	console.log(iptest);
    res.render('index',{iptest : iptest});
};

exports.chocolates = function(req, res){
    var numberOfChocs = 10;
    res.render('chocs', {numberOfChocs : numberOfChocs});
};

exports.open = function(repeat){ // Wow. Such closure.
    return function(req, res){
	res.render('open', {repeat : repeat});
    };
};
