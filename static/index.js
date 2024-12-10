//Saved recipes container
var savedRecipesGrid = document.querySelector('.saved-recipes .recipes-grid'); 
var dropdown = document.querySelectorAll('.dropdown');
var savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
var recipes = [];

/*
* This function to adds the recipe cared into the DOM by certain filter 
*/
function addRecipeCard(recipe){
  var recipeContent = Handlebars.templates.recipecardTemplate({
    name: recipe.name,
    imgURL:recipe.imgURL,
    link: recipe.link,
    rating: recipe.rating,
    season: recipe.season,
    categories: recipe.categories,
  })
  // console.log(recipeContent)
  var recipeGrid = document.getElementsByClassName('recipes-grid')[0]
  // console.log(recipeGrid)
  recipeGrid.insertAdjacentHTML("beforeend", recipeContent)
}

/*
* This function gets all the filtering conditions, removes all recipes from the DOM
*/
function handleFilters(){
   //Get all the filtering conditions
  var filters = {
    name: document.getElementById("filter-text").value.trim(),
    categories: document.getElementById('categories-dropdown').value.trim(),
    season: document.getElementById('season-dropdown').value.trim(),
    rating: document.getElementById('rating-dropdown').value.trim()
  }

  console.log(filters)

   //Remove all recipes from the DOM
  var recipeCardCollection= document.getElementsByClassName("recipe-card");
  while(recipeCardCollection.length > 0){
    recipeCardCollection[0].remove();
  }

  recipes.forEach((recipe) => {
    if(passFilterTest(recipe,filters)){
      addRecipeCard(recipe);
    }
  })

}

/*
* This function filters all recipes from the DOM
*/
function passFilterTest(recipe, filters){
  if(filters.name){
    var recipeName = recipe.name.toLowerCase()
    var filterName = filters.name.toLowerCase()
    if(recipeName.indexOf(filterName) === -1){
      return false;
    }
  }

  if (filters.categories !== "all"){
    if(recipe.categories.toLowerCase() !== filters.categories.toLowerCase()){
      return false;
    }
  }
  
  if (filters.season !== "all"){
    if(recipe.season.toLowerCase() !== filters.season.toLowerCase()){
      return false;
    }
  }
  
  if (filters.rating != "all"){
    var starCount = recipe.rating.split('⭐').length-1
    // console.log(starCount)
    if(starCount !== Number(filters.rating)){
      return false;
    }
  }
  return true;
}

/*
* This function gets the data of a recipe card to store into array of recipe card (create object for data)
*/
function parseRecipeCard(currRecipeCard){
  //create recipe object 
  var link = currRecipeCard.querySelector("a").href
  var recipe = {
    link : link
  }
  //Get the recipe info from image element
  var recipeImage = currRecipeCard.querySelector('img');
  recipe.imgURL = recipeImage.src;
  recipe.name = recipeImage.alt;
  recipe.categories = currRecipeCard.getAttribute("category");
  recipe.season = currRecipeCard.getAttribute("season");
  recipe.rating = currRecipeCard.getAttribute("rating");

  //Return the recipe object to store in array 
  return recipe;
}


// Load recipes on page 
window.addEventListener('DOMContentLoaded', function () {
 
  var recipeCards = document.getElementsByClassName('recipe-card');
  for (var i = 0; i < recipeCards.length; i++) {
    recipes.push(parseRecipeCard(recipeCards[i]));
  }

  if (window.location.pathname === '/saved') {
    savedRecipes.forEach((recipe) => {
      addSavedRecipe(recipe);
    })
  }

   /*
    Auto-suggest/ dynamic changing as soons as filter input changed
   */ 
  //Filter if input in search
  var searchBar = document.getElementById("filter-text") 
  if (searchBar) {
    searchBar.addEventListener("input", handleFilters)
  }

  //Filter if season changed
  var seasonDropdown = document.getElementById("season-dropdown");
  if (seasonDropdown) {
  seasonDropdown.addEventListener("change", handleFilters);
  }

  //Filter if categories changed
  var categoriesDropdown = document.getElementById("categories-dropdown");
  if (categoriesDropdown) {
  categoriesDropdown.addEventListener("change", handleFilters);
  }

  //Filter if rating changed
  var ratingsDropdown = document.getElementById("rating-dropdown");
  if (ratingsDropdown) {
  ratingsDropdown.addEventListener("change", handleFilters);
  }
})

//Recipe card
document.addEventListener('click', function (event) {
  if (event.target.closest('.recipe-card')) {
    var card = event.target.closest('.recipe-card');
    var recipeName = card.querySelector('h2').textContent;
    var recipeImage = card.querySelector('img').src;
    var recipeRating = card.getAttribute('rating');
    displayRecipe({name: recipeName, img: recipeImage, rating: recipeRating});
    }
  });

// Dropdown
dropdown.forEach(function(dropdown) {
  var button = dropdown.querySelector('.dropbtn');
  var content = dropdown.querySelector('.dropdown-content');
  button.addEventListener('click', function(event) {
    event.stopPropagation();
  });
});

//SAVE button
document.addEventListener('click', function(event) {
  if (event.target && event.target.classList.contains('save-button')) {
    saveButton = event.target;
    recipeCard = saveButton.closest('.recipe-card');
    recipeName = recipeCard.querySelector('h2').textContent;
    recipeImage = recipeCard.querySelector('img').src;
    recipeRating = recipeCard.getAttribute('rating');
    link = recipeCard.querySelector('a').href;

    const savedRecipe = {
      name: recipeName,
      img: recipeImage,
      link: link,
      rating: recipeRating,
      saved: saveButton.textContent === 'SAVE',
    };
    console.log('Saving Recipe:', savedRecipe); 
    saveRemoveButton(recipeCard, saveButton, savedRecipe);
  }
});

/*
* This function to add saved recipe to grid at end of current saved recipes
*/
function addSavedRecipe(recipe) {
  if (savedRecipesGrid && recipe.saved) {
    var recipeContent = Handlebars.templates.recipecardTemplate({
      name: recipe.name,
      imgURL: recipe.img,
      link: recipe.link,
      rating: recipe.rating,
      season: recipe.season,
      categories: recipe.categories,
    });
    console.log(localStorage.getItem('savedRecipes'));
    console.log('Recipe Rating:', recipe.rating);
    savedRecipesGrid.insertAdjacentHTML("beforeend", recipeContent);
    var addedCard = savedRecipesGrid.lastElementChild;

    var saveButton = addedCard.querySelector('.save-button');
    if (saveButton) {
      saveButton.textContent = 'REMOVE';
    }
  }
}

/*
* This function displays recipes
*/
function displayRecipe(recipe) {
  var modal = document.getElementById('recipeModal');
  if (modal) {
    modal.querySelector('h2').textContent = recipe.name;
    modal.querySelector('img').src = recipe.img;
    modal.querySelector('#rating').textContent = recipe.rating;
    modal.classList.add('show');
  }
}

/*
* This function helps button logic, if SAVE button is clicked, changes to REMOVE, with a 3 second UNDO timer. 
*/
function saveRemoveButton(recipeCard, saveButton, recipe) {
  if (!recipeCard.timer) {
    recipeCard.timer = null;
  } 
  //If not duplicate, add to saved and set SAVE button to SAVED
  if (saveButton.textContent === 'SAVE') {
    var duplicate = savedRecipes.some((r) => r.name === recipe.name);
    if (!duplicate) {
      recipe.saved = true;
      savedRecipes.push(recipe);
      localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
      if (window.location.pathname === '/saved') {
        addSavedRecipe(recipe);
      }
    } 
    document.querySelectorAll('.recipe-card').forEach((card) => {
      var recipeCardName = card.querySelector('h2').textContent;
      if (recipeCardName === recipe.name) {
        var button = card.querySelector('.save-button');
        if (button) {
          button.textContent = 'SAVED';
          button.disabled = true;
        }
      }
    });
  }
  //If REMOVED is selected, change opacity and start 3 second timer
  else if (saveButton.textContent === 'REMOVE') {
    saveButton.textContent = 'UNDO';
    recipeCard.style.opacity = '0.5';
    recipeCard.timer = setTimeout(() => {
      recipeCard.remove();
      recipe.saved = false;
      savedRecipes = savedRecipes.filter((r) => r.name !== recipe.name);
      localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    }, 3000);
  }
  //If UNDO is selected, return to original state of REMOVE, end timer
  else if (saveButton.textContent === 'UNDO') {
    console.log('UNDO clicked!');
    saveButton.textContent = 'REMOVE';
    recipeCard.style.opacity = '1';
    if (recipeCard.timer) {
      clearTimeout(recipeCard.timer);
      recipeCard.timer = null;
      recipe.saved = true;
    }
  }
}

/*
* This function to filter recipes by search criteria
*/
function filterCards() {
  var type = document.getElementById('filter-main-meal').value.toLowerCase();
  var season = document.getElementById('filter-season').value.toLowerCase();
  var rating = document.getElementById('filter-rating').value.toLowerCase();
  
  document.querySelectorAll('.recipe-card').forEach(function (card) {
    var recipeType = (card.getAttribute('name') || '').toLowerCase();
    var recipeSeason = (card.getAttribute('season') || '').toLowerCase();
    var recipeRating = (card.getAttribute('rating') || '').toLowerCase();
    
    //If matches, display
    var matchType = !type || recipeType.includes(type.trim());
    var matchSeason = !season || recipeSeason.includes(season.trim());
    var matchRating =!rating || recipeRating.includes(rating.trim());
    if (matchType && matchSeason && matchRating) {
      card.style.display = 'inline-block';
    }
    else {
      card.style.display = 'none';
    }
  });
}

/*
* This function clears all filter values, re-inserting recipes
*/
function clearFiltersAndReinsertRecipes() {
  document.querySelector('#filter-main-meal').value = '';
  document.querySelector('#filter-season').value = '';
  document.querySelector('#filter-rating').value = '';
  
  document.querySelectorAll('.recipe-card').forEach(function (card)  {
    card.style.display = 'inline-block';
  });
}
