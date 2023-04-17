// array of base liquor choices, if empty set up array
var baseLiqourChoices = JSON.parse(localStorage.getItem("base-liquor-choices")) || [];

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

  if (!ingredientChoices.includes(SecondIngredient)) {
    ingredientChoices.push(SecondIngredient);
    saveIngredient();
  };


  // second ingredient
  var secondIngredientEl = document.getElementById('first-ingredient-input');
  var secondIngredientEl = secondIngredientEl.value.trim();
  if (!SecondIngredient) {
    return;
  }
  // clear second ingredient input field after submission
  SecondIngredient.value = '';

  if (!ingredientChoices.includes(SecondIngredient)) {
    ingredientChoices.push(SecondIngredient);
    saveIngredients();
  };

  // function to get cocktail based on user input choices
  getCocktail(cocktail);
});

// function to get cocktail
function getCocktail(cocktail) {

  if (data.length === 0) {
    // !we need to use a modal here, not an alert
    alert('lubba-dubba-dub-dub!  No results, try again!');
  }
  if (baseLiquor && !firstIngredient && !secondIngredient) {
    getCocktailBaseOnlyID(baseLiquor);

  } else if (baseLiquor && firstIngredient && !secondIngredient) {
    getCocktailWithFirstIngrID(baseLiquor, firstIngredient);

  } else if (baseLiquor && !firstIngredient && secondIngredient) {
    getCocktailWithSecondIngrID(baseLiquor, secondIngredient);

  } else if (baseLiquor && firstIngredient && secondIngredient) {
    getCocktailWithTwoIngrID(baseLiquor, firstIngredient, secondIngredient);
  }

  getCocktailIngredients(data.drinks[0].idDrink);

};


var cocktailNameEl = document.getElementById('cocktail-name')    
cocktailNameEl.textContent = cocktail;


// function to get the cocktail ID number, depending on user input(s)
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


function getCocktailIngredients(cocktailNumber) {
  ingredientQueryUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailNumber}`;
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
=======

/*
Search by ingredient style query using "1" as the API key

www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka
*/

// TODO function to SHOW the cocktail data to the user, populate the cocktail cards:
function showCocktail(data) {};
