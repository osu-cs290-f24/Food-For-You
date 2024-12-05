//Saved recipes container
var savedRecipesGrid = document.querySelector('.saved-recipes .recipes-grid'); 
var dropdown = document.querySelectorAll('.dropdown');
var recipes = [];

fetch('recipe-cardData.JSON')
.then((response) => response.json())
.then((data) => {
  recipes = data;
  recipes.forEach(addSavedRecipe);
})

//Recipe card
document.addEventListener('click', function (event) {
  if (event.target.closest('.recipe-card')) {
    var card = event.target.closest('.recipe-card');
    var recipeTitle = card.querySelector('h2').textContent;
    var recipeImage = card.querySelector('img').src;
    displayRecipe(recipeImage, recipeTitle);
    }
  });
  
// Dropdown
dropdown.forEach(function(dropdown) {
  var button = dropdown.querySelector('.dropbtn');
  var content = dropdown.querySelector('.dropdown-content');
  button.addEventListener('click', function(event) {
    content.classList.toggle('show');
  });
});


/*
* This function to add new recipe
*/
function addSavedRecipe(recipe) {
  if (savedRecipesGrid) {
    var recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');
    recipeCard.setAttribute('name', recipe.type);
    recipeCard.setAttribute('imageURL', recipe.season);
    recipeCard.setAttribute('rating', recipe.rating);
    var img = document.createElement('img');
    img.src = recipe.img;
    img.alt = recipe.title;
    
    var link = document.createElement('a');
    link.href = recipe['link-to-recipe'];
    link.target  = '_blank';
    var title = document.createElement('h2');
    title.textContent = recipe.name;
    link.appendChild(title);
    recipeCard.appendChild(img);
    recipeCard.appendChild(link);
    savedRecipesGrid.appendChild(recipeCard);
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
    var recipeType = card.getAttribute('name').toLowerCase();
    var recipeSeason = card.getAttribute('imageURL').toLowerCase();
    var recipeRating = card.getAttribute('rating').toLowerCase();
    
    var matchType = !type || recipeType.includes(type);
    var matchSeason = !season || recipeSeason.includes(season);
    var matchRating =!rating || recipeRating.includes(rating);
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
* into the DOM.
*/
function clearFiltersAndReinsertRecipes() {
  document.querySelector('#filter-main-meal').value = '';
  document.querySelector('#filter-season').value = '';
  document.querySelector('#filter-rating').value = '';
  
  document.querySelectorAll('.recipe-card').forEach(function (card)  {
    card.style.display = 'inline-block';
  });
}

/*
* This function displays random recipes
*/
function displayRandomRecipe() {
  const random = Math.floor(Math.random() * recipes.length)
  var recipe = recipes[random];
  var recipeCard = document.querySelector('#recipe-of-the-day');
  recipeCard.querySelector('img').src = recipe.img;
  recipeCard.querySelector('h2').textContent = recipe.title;
}


