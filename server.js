var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var port = process.env.PORT || 3000;
var recipeCard = require('./recipe-cardData.json');
const fs = require('fs');

app.set('view engine', 'handlebars');

app.set('views', './views');

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials")
}));

app.get('/', function (req, res) {

    var random = Math.floor(Math.random() * recipeCard.length);
    var explore = [];
    explore[0] = recipeCard[Math.floor(Math.random() * recipeCard.length)];
    explore[1] = recipeCard[Math.floor(Math.random() * recipeCard.length)];
    explore[2] = recipeCard[Math.floor(Math.random() * recipeCard.length)];
    
    //render a few random recipes the user hasn't saved
    res.render('page', {
        home: true,
        recipeoftheday: recipeCard[random],
        recipe: explore
    });
    
});

app.get('/allrecipes', function (req, res) {
    
    //render all recipes, whether saved or not
    res.render('page', {
        all: true,    
        recipeCard
    });
    
});

// app.get('/filtered', function (req, res) {

    //possibly remove this, filtering can be done by server or client
    //filter here if server, else just load all and filter in the DOM
    
    //render recipes based on user's filter preferences
    // res.render('recipe-cardTemplate', {
    //     filtered: true,
    //     recipeCard
    // });
    
// });

app.get('/explore', function (req, res) {

    //store all unsaved recipes into array
    var unsavedRecipes = [];
    for(var i = 0; i < recipeCard.length; i++) {
        if (recipeCard[i].saved == true) {
            continue;
        }
        else {
            unsavedRecipes[i] = recipeCard[i];
        }
    }


    //render all recipes not saved
    res.render('page', {
        saved: false,
        unsavedRecipes
    });

});

app.get('/saved', function (req, res) {

        //store all saved recipes into array
        var savedRecipes = [];
        var unsavedRecipes = [];

        for (var i = 0; i < recipeCard.length; i++) {
            if (recipeCard[i].saved) {
                savedRecipes.push(recipeCard[i]);
            } else {
                unsavedRecipes.push(recipeCard[i]);
            }
        }

    // Render the saved recipes only
    res.status(200).render('page', {
        saved: true,
        savedRecipes: savedRecipes,
        unsavedRecipes: unsavedRecipes,
    });
});

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
