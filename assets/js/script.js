// array of base liquor choices, if empty set up array
var baseLiquorChoices = JSON.parse(localStorage.getItem("base-liquor-choices")) || [];

// function to save base liqour input to local storage
function saveBaseLiquor() {
  localStorage.setItem("base-liquor-choices", JSON.stringify('base-liquor'));
};

// array of all ingredient choices, if empty set up array
var ingredientChoices = JSON.parse(localStorage.getItem("all-ingredients-choices")) || [];

// function to save all ingredients input to local storage
function saveIngredients() {
  localStorage.setItem("all-ingredients-choices", JSON.stringify('all-ingredients'));
};


// event listener for all liqour and ingredient choices input
var submitBtnEl = document.getElementById('submitBtn');
submitBtnEl.addEventListener('click', function (event) {
  event.preventDefault();


  // base liquor
  var baseLiquorEl = document.getElementById('base-liquor-input');
  var baseLiquor = baseLiquorEl.value;
  if (!baseLiquor) {

    // !we need to use a modal here, not an alert
    alert('you gotta choose a base liquor');
    return;
  }
  // clear base liquor input field after submission
  baseLiquorEl.value = '';

  if (!baseLiquorChoices.includes(baseLiquor)) {
    baseLiquorChoices.push(baseLiquor);
    saveBaseLiquor();
  };


  // first ingredient
  var firstIngredientEl = document.getElementById('first-ingredient-input');
  var firstIngredient = firstIngredientEl.value.trim();
  if (!firstIngredient) {
    return;
  }
  // clear first ingredient input field after submission
  firstIngredient.value = '';

  // make sure first and second ingredient choices aren't the same
  if (!ingredientChoices.includes(secondIngredient)) {
    ingredientChoices.push(firstIngredient);
    saveIngredients();
  };


  // second ingredient
  var secondIngredientEl = document.getElementById('first-ingredient-input');
  var secondIngredient = secondIngredientEl.value.trim();
  if (!secondIngredient) {
    return;
  }
  // clear second ingredient input field after submission
  secondIngredient.value = '';

  // make sure first and second ingredient choices aren't the same
  if (!ingredientChoices.includes(firstIngredient)) {
    ingredientChoices.push(secondIngredient);
    saveIngredients();
  };

  // function to get cocktail ID based on user input choices
  getCocktailID(data);
});

// function to get cocktail ID and ingredients and directions
function getCocktailID(data) {

  if (data.length === 0) {
    // !we need to use a modal here, not an alert
    alert('wubba-lubba-dub-dub!  No results, try again!');
  }

  // get proper ID
  if (baseLiquor && !firstIngredient && !secondIngredient) {
    getCocktailBaseOnlyID(baseLiquor);

  } else if (baseLiquor && firstIngredient && !secondIngredient) {
    getCocktailWithFirstIngrID(baseLiquor, firstIngredient);

  } else if (baseLiquor && !firstIngredient && secondIngredient) {
    getCocktailWithSecondIngrID(baseLiquor, secondIngredient);

  } else if (baseLiquor && firstIngredient && secondIngredient) {
    getCocktailWithTwoIngrID(baseLiquor, firstIngredient, secondIngredient);
  }

  // get list of ingredients and directions etc.
  getCocktailIngredients(data.drinks[i].idDrink);

};


// var drinkNameEl = document.getElementById('drink-name')
// drinkNameEl.textContent = drinkName;


// functions to get the cocktail ID number, depending on user input(s)
APIkey = 1;
function getCocktailBaseOnlyID(baseLiquor) {
  cocktailQueryUrl = `www.thecocktaildb.com/api/json/v1/${APIkey}/filter.php?i=${baseLiquor}`;
  fetch(cocktailQueryUrl, {
    method: 'GET',
    credentials: 'same-origin',
    redirect: 'follow',
  })

    .then(function (response) {
      if (!response.ok) {
        throw new Error('Bad network response');
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
};

function getCocktailWithFirstIngrID(baseLiquor, firstIngredient) {
  cocktailQueryUrl = `https://www.thecocktaildb.com/api/json/v1/${APIkey}/filter.php?i=${baseLiquor}&i=${firstIngredient}`;
  fetch(cocktailQueryUrl, {
    method: 'GET',
    credentials: 'same-origin',
    redirect: 'follow',
  })

    .then(function (response) {
      if (!response.ok) {
        throw new Error('Bad network response');
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
};

function getCocktailWithSecondIngrID(baseLiquor, secondIngredient) {
  APIkey = 1;
  cocktailQueryUrl = `https://www.thecocktaildb.com/api/json/v1/${APIkey}/filter.php?i=${baseLiquor}&i=${secondIngredient}`;
  fetch(cocktailQueryUrl, {
    method: 'GET',
    credentials: 'same-origin',
    redirect: 'follow',
  })

    .then(function (response) {
      if (!response.ok) {
        throw new Error('Bad network response');
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
};

function getCocktailWithTwoIngrID(baseLiquor, firstIngredient, secondIngredient) {
  cocktailQueryUrl = `https://www.thecocktaildb.com/api/json/v1/${APIkey}/filter.php?i=${baseLiquor}&i=${firstIngredient}&i=${secondIngredient}`;
  fetch(cocktailQueryUrl, {
    method: 'GET',
    credentials: 'same-origin',
    redirect: 'follow',
  })

    .then(function (response) {
      if (!response.ok) {
        throw new Error('Bad network response');
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
};

// function for getting rest of ingredients and directions depending on cocktail ID
var cocktailID = data.drinks[i].idDrink
function getCocktailIngredients(cocktailID) {
  ingredientQueryUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailID}`;
  fetch(ingredientQueryUrl, {
    method: 'GET',
  })

    .then(function (response) {
      if (!response.ok) {
        throw new Error('Bad network response');
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
};


/*
Search by ingredient style query using "1" as the API key

www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka
*/


// TODO function to SHOW the cocktail to the user, populate the cocktail cards:

// TODO card display functions
function displayCards(){

  // loop through the 5 options 
  var drinkArray; // = (pulled data for character and drink)
  var mortyArray; 
  $.each(drinkArray, (i) =>{
    var cardList = $('#card-list');
    var characterImg; // = cardData[i].avatar;
    var characterName; // = cardData[i].name;
    var drinkImg; // = cardData[i].image;
    var drinkName; // = cardData[i].name;


    cardList.append(`
    <li class=cards card-${[i] + 1}>
          <div id='drink-card'>
            //<h3>${characterName}'s Drink</h3>
            //<img src=${characterImg}>
            <div id="card-content">
              <h4>${data.drinks[i].strDrink}</h4>
              <img src=${data.drinks[i].strDrinkThumb}>
              <h5>ingredients</h5>
              <ul id='ingredient-list'> // for loop for ingredients directions data.drinks[i].strIngredient[j]
                <li>${data.drinks[i].strIngredient[j]}</li>
                <li>${data.drinks[i].strIngredient[j]}</li>
                <li>${data.drinks[i].strIngredient[j]}</li>
              </ul>
              <h4>Directions</h4>
              <ol id='directions-list'> //for loop for data.drinks[i].strInstructions[k]
                //<li>${data.drinks[i].strInstructions[k]}</li>
                //<li>${data.drinks[i].strInstructions[k]}</li>
                //<li>${data.drinks[i].strInstructions[k]}</li>
              </ol>
            </div>
          </div>
        </li>
    `)
  })
  showCocktail();
};


function showCocktail(data) {

};

// class toggle for opening card set



// DATA from the function getCocktailIngredients:
  // this would show data for specific drink at index[i]
    // location DRINK NAME: data.drinks[i].strDrink;
    // location of DRINK PIC: data.drinks[i].strDrinkThumb;
    // location GLASS TYPE: data.drinks[i].strGlass; 
    // location INGREDIENTS: data.drinks[i].strIngredient1;  the last number goes 1-15 depending on how many ingredients
    // location INSTRUCTIONS: data.drinks[i].strInstructions;
    // location MEASUREMENT: data.drinks[i].strMeasure1;   the last number goes 1-15 depending on how many measurements (one measure per ingredient).

// DATA from the functions for IDs
    // location ID: data.drinks[i].idDrink;


