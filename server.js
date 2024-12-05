
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var port = process.env.PORT || 3000;
var recipeCard = require('./recipe-cardData.json');

app.set('view engine', 'handlebars');

app.set('views', './views');

//use 'static' directory 
app.use(express.static(path.join(__dirname, 'static')));

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials")
}));

app.get('/', function (req, res) {
    
    //add recipe of the day rendering here


    //render a few random recipes the user hasn't saved
    res.render('recipe-cardTemplate', {recipeCard});
    
});

app.get('/allrecipes', function (req, res) {
    
    //render all recipes, whether saved or not
    res.render('recipe-cardTemplate', {recipeCard});
    
});

app.get('/filtered', function (req, res) {

    //ask Hess for help
    
    //render recipes based on user's filter preferences
    res.render('recipe-cardTemplate', {recipeCard});
    
});

app.get('/explore', function (req, res) {

    //render all recipes not saved
    res.render('recipe-cardTemplate', {saved: false, recipeCard});

});

app.get('/saved', function (req, res) {

    // Render the saved recipes only
    res.status(200).render('recipe-cardTemplate', {saved: true, recipeCard});
});

//listen on port 300
app.listen(port, function () {
	console.log("== Server is listening on: ", port);
});

//anything else, throw 404 error...leave this at the bottom
app.get('*', function (req, res) {
    res.status(404).render('404');
});