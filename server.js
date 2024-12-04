
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var recipecardData = require('./recipe-cardData.json');



//use 'static' directory 
app.use(express.static(path.join(__dirname, 'static')));

//listen on port 300
app.listen(port, function () {
	console.log("== Server is listening on: ", port);
});

//anything else, throw 404 error...leave this at the bottom
app.get('*', function (req, res) {
    res.status(404).render('404');
});