// array of base liquor choices, if empty set up array
var baseLiqourChoices = JSON.parse(localStorage.getItem("base-liquor-choices")) || [];

// function to save base liqour input to local storage
function saveCity() {
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
  var city = baseLiquorEl.value;
  if (!baseliquor) {

    // we need to use a modal here, not an alert
    alert('you gotta choose a base liquor');
    return;
  }
  // clear base liqour input field after submission
  baseLiquorEl.value = '';

  if (!baseLiquorChoices.includes(baseliquor)) {
    baseLiquorChoices.push(baseLiquor);
    saveBaseLiquor();
  };


  // first ingredient
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

// function to get base liquor
function getBaseLiquor(baseLiquor) {
  cocktailQueryUrl = ``;
  fetch(liquorQueryUrl, {
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
    if (data.length === 0) {
      // we need to use a modal here, not an alert
      alert('lubba-dubba-dub-dub!  No results, try again!');
    }
    
    getBaseLiquor(baseLiquor);
  })
};

// function to get ingredients
function getIngredients(ingredientOne, ingredientTwo) {
  
  queryUrl = `cd ..`
  
  fetch(ingredientQueryUrl, {
    method: 'GET',
    credentials: 'same-origin',
    redirect: 'follow',
  })
  
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    
    getIngredients(ingredientOneData, ingredientTwoData)
  });
};

// function to get cocktail - going to have to combine the other results so this function is INCOMPLETE
function getCocktail(cocktail) {
  cocktailQueryUrl = ``;
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
      if (data.length === 0) {
        // we need to use a modal here, not an alert
        alert('lubba-dubba-dub-dub!  No results, try again!');
      }

      showCocktail(data);
    })
};

// function to SHOW the cocktail to the user, populate the cocktail cards:

function showCocktail(data)
