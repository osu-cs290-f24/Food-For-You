//Saved recipes container
var savedRecipesGrid = document.querySelector('.saved-recipes .recipes-grid'); 
var dropdown = document.querySelectorAll('.dropdown');
var recipes = [];

//Recipe card
document.addEventListener('click', function (event) {
  if (event.target.closest('.recipe-card')) {
    var card = event.target.closest('.recipe-card');
    var recipeName = card.querySelector('h2').textContent;
    var recipeImage = card.querySelector('img').src;
    displayRecipe({name: recipeName, img: recipeImage});
    }
  });

// Dropdown
dropdown.forEach(function(dropdown) {
  var button = dropdown.querySelector('.dropbtn');
  var content = dropdown.querySelector('.dropdown-content');
  button.addEventListener('click', function(event) {
    event.stopPropagation();
    content.classList.toggle('show');
  });
});

//SAVE button
document.addEventListener('click', function(event) {
  if (event.target && event.target.classList.contains('save-button')) {
    saveButton = event.target;
    recipeCard = saveButton.closest('.recipe-card');
    recipeName = recipeCard.querySelector('h2').textContent;
    recipeImage = recipeCard.querySelector('img').src;
    link = recipeCard.querySelector('a').href;

    const savedRecipe = {
      name: recipeName,
      img: recipeImage,
      'link-to-recipe': link,
      saved: saveButton.textContent === 'SAVE',
    };
    saveRemoveButton(recipeCard, saveButton, savedRecipe);
  }
})

/*
* This function to add saved recipe to grid
*/

function addSavedRecipe(recipe) {
  if (savedRecipesGrid && recipe.saved) {
    var recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');
   
    var img = document.createElement('img');
    img.src = recipe.img;
    img.alt = recipe.name;
    
    var name = document.createElement('h2');
    var link = document.createElement('a');
    link.href = recipe['link-to-recipe'] || '#';
    //new tab
    link.target  = '_blank';
    link.textContent = recipe.name;
    link.style.textDecoration = 'none';
    link.style.color = 'inherit';
    link.style.cursor = 'pointer';
    name.style.textDecoration = 'none';

    name.appendChild(link);
    recipeCard.appendChild(img);
    recipeCard.appendChild(link);
    savedRecipesGrid.appendChild(recipeCard);
  }
}

/*
* This function helps button logic, if SAVE button is clicked,
* changes to REMOVE, with a 5 second UNDO timer. 
*/

function saveRemoveButton(recipeCard, saveButton, recipe) {
  if (saveButton.textContent === 'SAVE') {
    recipe.saved = true;
    saveButton.textContent = 'SAVED';
    saveButton.disabled = true;
    addSavedRecipe(recipe);
  } 
  else if (saveButton.textContent === 'REMOVE') {
    recipeCard.style.opacity = '0.5';
    saveButton.textContent = 'UNDO';
    const timer = setTimeout(() => {
    recipeCard.remove();
    recipe.saved = false;
      }, 5000);

    saveButton.onclick = () => {
      clearTimeout(timer);
      recipeCard.style.opacity = '1';
      recipe.saved = true;
      saveButton.textContent = 'REMOVE';
      saveButton.onclick = () => saveRemoveButton(recipeCard, saveButton, recipe);
    };
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
    modal.classList.add('show');
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

