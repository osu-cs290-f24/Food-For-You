//Saved recipes container
var savedRecipesGrid = document.querySelector('.saved-recipes .recipes-grid'); 
var dropdown = document.querySelectorAll('.dropdown');
var recipeCards = document.querySelectorAll('.recipe-card');

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
    img.src = recipe.image;
    img.alt = recipe.title;
    recipeCard.appendChild(img);
    recipeCard.appendChild(title);
    savedRecipesGrid.appendChild(recipeCard);
    recipeCards = document.querySelectorAll('.recipe-card');
    recipeCard.addEventListener('click', function() {
      displayRecipe(recipe.title, recipe.ingredients)
    });
  }
}

/*
 * This function to remove recipe
 */
function removeSavedRecipe(recipeID) {
  var recipeCard = document.querySelector('.recipe-card[data-recipe="' + recipeID + '"]');
  if (recipeCard) {
    savedRecipesGrid.removeChild(recipeCard);
  }
}

//Recipe card
document.addEventListener('DOMContentLoaded', function() {
  const recipeCards = document.querySelectorAll('.recipe-card');
  recipeCards.forEach(function(card) {
    card.addEventListener('click', function () {
      var recipeTitle = this.querySelector('h2').textContent;
      var recipeIngredients = this.querySelector('.ingredients').textContent;
      displayRecipe(recipeTitle, recipeIngredients);
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

/*
 * This function updates recipe when added/removed
 */
function updateRecipe() {
  recipeCards = document.querySelectorAll('.recipe-card');
}

/*
 * This function to display recipe
 */
function displayRecipe(title, ingredients) {
  var modal = document.getElementById('recipeModal');
  if (modal) {
    modal.querySelector('h2').textContent = title;
    modal.querySelector('.ingredients').textContent = ingredients;
    modal.classList.add('show');
  }
}


/*
 * This function to filter recipes by search criteria
 */
function filterCards() {
  var type = document.querySelector('#recipe-type-filter');
  var season = document.querySelector('#recipe-season-filter');
  var rating = document.querySelector('#recipe-rating-filter');

  recipeCards.forEach(function(card) {
    var recipeType = card.getAttribute('data-type').toLocaleLowerCase();
    var recipeSeason = card.getAttribute('data-season').toLocaleLowerCase();
    var recipeRating = card.getAttribute('data-rating').toLocaleLowerCase();
    
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
  document.querySelector('#recipe-type-filter').value = '';
  document.querySelector('#recipe-season-filter').value = '';
  document.querySelector('#recipe-rating-filter').value = '';

  recipeCards.forEach(function(card) {
    card.style.display = 'inline-block';
  });
}


