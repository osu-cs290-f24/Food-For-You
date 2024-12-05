//Saved recipes container
var savedRecipesGrid = document.querySelector('.saved-recipes .recipes-grid'); 
var dropdown = document.querySelectorAll('.dropdown');
var recipeCards = document.querySelectorAll('.recipe-card');
var recipes = [];

fetch('recipe-cardData.JSON')
.then((response) => response.json())
.then((data) => {
  recipes = data;
})

//Event listeners
document.querySelectorAll('h2').forEach(function (h2) {
  h2.addEventListener("click", function() {
    var link = this.getAttribute('href');
    if (link) {
      window.location.href = this.href;
    }
  });
});

/*
 * This function to add new recipe
 */
function addSavedRecipe(recipe) {
  if (savedRecipesGrid) {
    var recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');
    var title = document.createElement('h2');
    title.textContent = recipe.title;
    var img = document.createElement('img');
    img.src = recipe.img;
    img.alt = recipe.title;
    recipeCard.appendChild(img);
    recipeCard.appendChild(title);
    savedRecipesGrid.appendChild(recipeCard);
    recipeCards = document.querySelectorAll('.recipe-card');
    recipeCard.addEventListener('click', function() {
      displayRecipe(recipe.img, recipe.title)
    });
  }
}

/*
 * This function to remove recipe
 */
function removeSavedRecipe(recipe) {
  var recipeCard = document.querySelector('.recipe-card[data-recipe="' + recipe + '"]');
  if (recipeCard) {
    savedRecipesGrid.removeChild(recipeCard);
  }
}

/*
* This function updates recipe when added/removed
*/
function updateRecipe() {
  recipeCards = document.querySelectorAll('.recipe-card');
}

var recipes = [
  {
    title: "",
    img: ""
  },
  {
    title: "",
    img: ""
  },
  {
    title: "",
    img: ""
  },
  {
    title: "",
    img: ""
  }
];

function randomRecipe() {
  const random = Math.floor(Math.random() * recipes.length);
  return recipes[random];
}

function displayRandomRecipe() {
  var recipe = randomRecipe();
  var recipeCard = document.getElementById('.recipe-card');
  recipeCard.querySelector('img').src = recipe.img;
  recipeCard.querySelector('h2').textContent = recipe.title;
}
/*
* This function to filter recipes by search criteria
*/
function filterCards() {
  var type = document.getElementById('filter-main-meal');
  var season = document.getElementById('filter-season');
  var rating = document.getElementById('filter-rating');
  
  recipeCards.forEach(function(card) {
    var recipeType = card.getAttribute('name').toLocaleLowerCase();
    var recipeSeason = card.getAttribute('imageURL').toLocaleLowerCase();
    var recipeRating = card.getAttribute('rating').toLocaleLowerCase();
    
    var matchType = !type.value || recipeType.includes(type.value.toLowerCase());
    var matchSeason = !season.value || recipeSeason.includes(season.value.toLowerCase());
    var matchRating =!rating.value || recipeRating.includes(rating.value.toLowerCase());
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
  document.querySelector('filter-main-meal').value = '';
  document.querySelector('filter-season').value = '';
  document.querySelector('filter-rating').value = '';

  recipeCards.forEach(function(card) {
    card.style.display = 'inline-block';
  });
}

//Recipe card
document.addEventListener('DOMContentLoaded', function() {
  const recipeCards = document.querySelectorAll('.recipe-card');
  recipeCards.forEach(function(card) {
    card.addEventListener('click', function () {
      var recipeImage = this.querySelector('img').src;
      var recipeTitle = this.querySelector('h2').textContent;
      displayRecipe(recipeTitle);
    });
  });
  
  // Dropdown
  dropdown.forEach(function(dropdown) {
    var button = dropdown.querySelector('.dropbtn');
    var content = dropdown.querySelector('.dropdown-content');
    button.addEventListener('click', function(event) {
      content.classList.toggle('show');
    });
  });
})


