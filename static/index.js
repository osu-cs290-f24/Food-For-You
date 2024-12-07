//Saved recipes container
var savedRecipesGrid = document.querySelector('.saved-recipes .recipes-grid'); 
var dropdown = document.querySelectorAll('.dropdown');
var savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
var recipes = [];

//Add the recipe cared into the DOM by certain filter 
function addRecipeCard(imgURL, name, link, rating, season, categories){
  var recipeContent = Handlebars.templates.recipeCardTemplate({
    name:name,
    imgURL:imgURL,
    'link-to-recipe': link,
    rating: rating,
    season: season,
    categories: categories,
  })
  var postsSection = document.getElementById('recipe-card')
  postsSection.insertAdjacentHTML("beforeend", recipeContent)
}
window.addEventListener('DOMContentLoaded', function () {
  //Save all recipes for filtering 
    var recipeCards = document.getElementsByClassName('recipe-card')
    for (var i = 0; i < recipeCards.length; i++) {
      recipes.push(parseRecipeCard(recipeCards[i]))
  }
})

//Get the data of a recipe card to store into array of recipe card (create object for data)
function parseRecipeCard(currRecipeCard){
    //create recipe object 
    var recipe = {}
    //Get the recipe info from image element
    var recipeImage = currRecipeCard.querySelector('img')
    recipe.imgURL = recipeImage.src
    recipe.name = recipeImage.alt
    //Return the recipe object to store in array 
    return recipe
}


// Load recipes on page load
window.addEventListener('DOMContentLoaded', function () {
  if (window.location.pathname === '/saved') {
    savedRecipes.forEach((recipe) => {
      addSavedRecipe(recipe);
    });
  }
});

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
    recipeCard.setAttribute('name', recipe.categories || '');
    recipeCard.setAttribute('season', recipe.season || '');
    recipeCard.setAttribute('rating', recipe.rating || '');

    var saveButton = document.createElement('button');
    saveButton.classList.add('save-button');
    saveButton.type = 'button';
    if (recipe.saved) {
      saveButton.textContent = 'REMOVE';
    } else {
        saveButton.textContent = 'SAVE';
    } 
    var img = document.createElement('img');
    img.src = recipe.img;
    img.alt = recipe.name;

    var link = document.createElement('a');
    link.href = recipe['link-to-recipe'] || '#';
    link.target = '_blank';

    var name = document.createElement('h2');
    name.textContent = recipe.name;
    link.appendChild(name);

    var rating = document.createElement('rating');
    rating.textContent = 'Rating: ' + recipe.rating;

    recipeCard.appendChild(saveButton); 
    recipeCard.appendChild(img);
    recipeCard.appendChild(link); 
    recipeCard.appendChild(rating); 
    savedRecipesGrid.appendChild(recipeCard);
  }
}

/*
* This function helps button logic, if SAVE button is clicked,
* changes to REMOVE, with a 3 second UNDO timer. 
*/

function saveRemoveButton(recipeCard, saveButton, recipe) {
  if (!recipeCard.timer) {
    recipeCard.timer = null;
  } 

  if (saveButton.textContent === 'SAVE') {
    recipe.saved = true;
    saveButton.textContent = 'SAVED';
    saveButton.disabled = true;
    savedRecipes.push(recipe);
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    if (window.location.pathname === '/saved') {
      addSavedRecipe(recipe);
    }
  } 
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
  else if (saveButton.textContent === 'UNDO') {
    console.log('UNDO clicked!');
    saveButton.textContent = 'REMOVE';
    recipeCard.style.opacity = '1';
    if (recipeCard.timer) {
      clearTimeout(recipeCard.timer);
      recipeCard.timer = null;
      recipe.saved = true;
    }
  };
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

