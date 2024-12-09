
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var port = process.env.PORT || 3022;
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

    var index = new Set();

    while (index.size < 4) {
        var randomIndex = Math.floor(Math.random() * recipeCard.length);
        index.add(randomIndex);
    }

    // Convert the Set to an array
    var random = Array.from(index);


    var explore = [];
    explore[0] = recipeCard[random[1]];
    explore[1] = recipeCard[random[2]];
    explore[2] = recipeCard[random[3]];

    //render a few random recipes the user hasn't saved
    res.render('page', {
        home: true,
        recipeoftheday: recipeCard[random[0]],
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
        explore: true,
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
   res.status(404).render('404', {layout: false});
});
