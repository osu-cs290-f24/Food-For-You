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
.catch(function (err) {
  alert("An error occurred while retrieving recipe.")
})

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

//All recipes
var allRecipes = document.querySelector('.all-recipes-link');
  allRecipes.addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('.recipes-grid').scrollIntoView ({
      behavior: 'smooth',
      block: 'start',
    });
});


/*
* This function to add new recipe
*/

//revise, should only go into recipe-cardData.JSON and change "saved": to true

function addSavedRecipe(recipe) {
  if (savedRecipesGrid) {
    var recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');
    recipeCard.setAttribute('name', recipe.type);
    recipeCard.setAttribute('season', recipe.season);
    recipeCard.setAttribute('rating', recipe.rating);
    var img = document.createElement('img');
    img.src = recipe.img;
    img.alt = recipe.name;
    
    var link = document.createElement('a');
    link.href = recipe['link-to-recipe'];
    //new tab
    link.target  = '_blank';
    var name = document.createElement('h2');
    name.textContent = recipe.name;
    link.appendChild(name);

    var saveButton = document.createElement('button');
    saveButton.classList.add('save-button');
    saveButton.type = 'button';
    saveButton.textContent = 'SAVE';
    saveButton.addEventListener('click', () => saveRemoveButton(recipeCard, saveButton));

    recipeCard.appendChild(img);
    recipeCard.appendChild(link);
    savedRecipesGrid.appendChild(recipeCard);
  }
}

/*
* This function helps button logic, if saved button is clicked,
* changes to remove, with a 5 second timer. 
*/

//revise, should only go into recipe-cardData.JSON and change "saved": to false

function saveRemoveButton(recipeCard, saveButton) {
  if (saveButton.textContent === 'SAVE') {
    saveButton.textContent = 'REMOVE';
  }
  else {
    recipeCard.style.opacity = '0.5';
    saveButton.textContent = 'UNDO';
    const timer = setTimeout(() => {
    recipeCard.remove();
      }, 5000);
    saveButton.onclick = () => {
      clearTimeout(timer);
      recipeCard.style.opacity = '1';
      saveButton.textContent = 'SAVE';
      saveButton.onclick = () => saveRemoveButton(recipeCard, saveButton);
    };
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
    var recipeSeason = card.getAttribute('season').toLowerCase();
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
  if (!recipes.length) {
    return;
  }
  const random = Math.floor(Math.random() * recipes.length)
  var recipe = recipes[random];
  var recipeCard = document.querySelector('#recipe-of-the-day');
  recipeCard.querySelector('img').src = recipe.img;
  recipeCard.querySelector('h2').textContent = recipe.name;
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


