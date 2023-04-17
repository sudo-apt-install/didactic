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
        // !we need to use a modal here, not an alert
        alert('lubba-dubba-dub-dub!  No results, try again!');
      }
      if (!baseLiquor) {
      } else if (baseLiquor && !firstIngredient && !secondIngredient) {
        showCocktailBaseOnly(baseLiquor[loc]);

      } else if (baseLiquor && firstIngredient && !secondIngredient) {
        showCocktailFirstIngredient(baseLiquor[loc], firstIngredient[loc]);

      } else if (baseLiquor && !firstIngredient && secondIngredient) {
        showCocktailSecondIngredient(baseLiquor[loc], secondIngredient[loc]);
        
      } else if (baseLiquor && firstIngredient && secondIngredient) {
        showCocktailTwoIngredients(baseLiquor[loc], firstIngredient[loc], secondIngredient[loc]);
        }
      }
    )
};

// TODO function to SHOW the cocktail to the user, POPULATE the cocktail cards:
function showCocktailBaseOnly(baseLiquor) {};

function showCocktailFirstIngredient(baseLiquor, firstIngredient) {};

function showCocktailFirstIngredient(baseLiquor, secondIngredient) {};

function showCocktailTwoIngredients() {baseLiquor, firstIngredient, secondIngredient};

/*
Search by ingredient style query using "1" as the API key

www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka
*/

// TODO function to SHOW the cocktail to the user, populate the cocktail cards:

// TODO card display functions
function displayCards(){

  // loop through the 5 options 
  var cardData; // = (pulled data for character and drink)
  $.each(cardData, (i) =>{
    var cardList = $('#card-list');
    var characterImg; // = cardData[i].avatar;
    var characterName; // = cardData[i].name;
    var drinkImg; // = cardData[i].image;
    var drinkName; // = cardData[i].name;


    // cardList.append(`
    // <li class=`cards card-${[i]}`>
    //       <div id='drink-card'>
    //         <h3>`${characterName}`'s Drink</h3>
    //         <img src=`${characterImg}`>
    //         <div id="card-content">
    //           <h4>`${drinkName}`</h4>
    //           <img src=`${drinkImg}`>
    //           <h5>ingredients</h5>
    //           <ul id='ingredient-list'> // for loop for ingredients
    //             //<li>`${ingredient[0]}`</li>
    //             //<li>`${ingredient[1]}`</li>
    //             //<li>`${ingredient[2]}`</li>
    //           </ul>
    //           <h4>Directions</h4>
    //           <ol id='directions-list'> //for loop for directions
    //             //<li>`${direction[0]}`</li>
    //             //<li>`${direction[1]}`</li>
    //             //<li>`${direction[2]}`</li>
    //           </ol>
    //         </div>
    //       </div>
    //     </li>
    // `)
  })
  showCocktail();
};


function showCocktail(data) {

};
