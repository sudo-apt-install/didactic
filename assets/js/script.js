// array of base liquor choices, if empty set up array
var baseLiquorChoices =
  JSON.parse(localStorage.getItem("base-liquor-choices")) || [];
const baseLiquorEl = document.getElementById("drop-down");

baseLiquorEl.addEventListener("change", () => {
  baseLiquor = baseLiquorEl.value;
});

// array of First ingredient choices, if empty set up array
var firstIngredientChoices =
  JSON.parse(localStorage.getItem("first-ingredients-choices")) || [];
var firstIngredientEl = document.getElementById("first-ingredient-input");
firstIngredientEl.addEventListener('input', () => {
  firstIngredient = firstIngredientEl.value.trim();
});

// array of Second ingredient choices, if empty set up array
var secondIngredientChoices =
  JSON.parse(localStorage.getItem("second-ingredients-choices")) || [];
var secondIngredientEl = document.getElementById("second-ingredient-input");

var secondIngredient = secondIngredientEl.value.trim();

// function to save base liquor input to local storage
function saveBaseLiquor() {
  // clear base liquor input field after submission
  baseLiquorEl.value = "";
  console.log(baseLiquor);
  baseLiquorChoices.push(baseLiquor);
  localStorage.setItem("base-liquor", JSON.stringify(baseLiquorChoices));
}

// function to save FIRST ingredients input to local storage
function saveFirstIngredients() {
  // clear first ingredient input field after submission
  firstIngredientEl.value = "";
  console.log(firstIngredient);
  firstIngredientChoices.push(firstIngredient);
  localStorage.setItem(
    "first-ingredients-choices",
    JSON.stringify(firstIngredientChoices)
  );
}

// function to save SECOND ingredients input to local storage
function saveSecondIngredients() {
  // clear second ingredient input field after submission
  secondIngredientEl.value = "";
  console.log(secondIngredient);
  secondIngredientChoices.push(secondIngredient);
  localStorage.setItem(
    "second-ingredients-choices",
    JSON.stringify(secondIngredientChoices)
  );
}

// event listener for all liquor and ingredient choices input
var submitBtnEl = document.getElementById("submitBtn");
submitBtnEl.addEventListener("click", function (event) {
  event.preventDefault();

  switch (true) {
    case baseLiquor && !firstIngredient && !secondIngredient:
      saveBaseLiquor(baseLiquor);
      getCocktailBaseOnlyID(baseLiquor);
      break;
    case baseLiquor && firstIngredient && !secondIngredient:
      saveBaseLiquor(baseLiquor);
      saveFirstIngredients(firstIngredient);
      getCocktailWithFirstIngrID(baseLiquor, firstIngredient);
      break;
    case baseLiquor && !firstIngredient && secondIngredient:
      saveBaseLiquor(baseLiquor);
      saveSecondIngredients(secondIngredient);
      getCocktailWithSecondIngrID(baseLiquor, secondIngredient);
      break;
    case baseLiquor && firstIngredient && secondIngredient:
      saveBaseLiquor(baseLiquor);
      saveFirstIngredients(firstIngredient);
      saveSecondIngredients(secondIngredient);
      getCocktailWithTwoIngrID(baseLiquor, firstIngredient, secondIngredient);
      break;
    default: // Or use a modal here
      alert("Gimme some basic info, Morty!");
      return;
  }
});

// functions to get the cocktail ID number, depending on user input(s)
APIkey = 1;
function getCocktailBaseOnlyID(baseLiquor) {
  cocktailQueryUrl = `https://www.thecocktaildb.com/api/json/v1/${APIkey}/filter.php?i=${baseLiquor}`;
  fetch(cocktailQueryUrl, {
    method: "GET",
    // credentials: 'same-origin',
    // redirect: 'follow',
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Bad network response");
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.length === 0) {
        // !we need to use a modal here, not an alert
        alert("wubba-lubba-dub-dub!  No results, try again!");
      }

      getDetails(data.drinks[0].idDrink);
    });
}

function getCocktailWithFirstIngrID(baseLiquor, firstIngredient) {
  cocktailQueryUrl = `https://www.thecocktaildb.com/api/json/v1/${APIkey}/filter.php?i=${baseLiquor}&i=${firstIngredient}`;
  fetch(cocktailQueryUrl, {
    method: "GET",
    credentials: "same-origin",
    redirect: "follow",
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Bad network response");
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.length === 0) {
        // !we need to use a modal here, not an alert
        alert("wubba-lubba-dub-dub!  No results, try again!");
      }
      getDetails(data.drinks[0].idDrink);
    });
}

function getCocktailWithSecondIngrID(baseLiquor, secondIngredient) {
  APIkey = 1;
  cocktailQueryUrl = `https://www.thecocktaildb.com/api/json/v1/${APIkey}/filter.php?i=${baseLiquor}&i=${secondIngredient}`;
  fetch(cocktailQueryUrl, {
    method: "GET",
    credentials: "same-origin",
    redirect: "follow",
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Bad network response");
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.length === 0) {
        // !we need to use a modal here, not an alert
        alert("Wubba-lubba-dub-dub!  No results, try again!");
      }
      // need for loop for [i], not [0].
      getDetails(data.drinks[0].idDrink);
    });
}

function getCocktailWithTwoIngrID(
  baseLiquor,
  firstIngredient,
  secondIngredient
) {
  cocktailQueryUrl = `https://www.thecocktaildb.com/api/json/v1/${APIkey}/filter.php?i=${baseLiquor}&i=${firstIngredient}&i=${secondIngredient}`;
  fetch(cocktailQueryUrl, {
    method: "GET",
    credentials: "same-origin",
    redirect: "follow",
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Bad network response");
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.length === 0) {
        // !we need to use a modal here, not an alert
        alert("Wubba-lubba-dub-dub!  No results, try again!");
      }
      getDetails(data.drinks[0].idDrink);
    });
}

// function for getting rest of ingredients and directions depending on cocktail ID
function getDetails(cocktailID) {
  ingredientQueryUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailID}`;
  fetch(ingredientQueryUrl, {
    method: "GET",
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Bad network response");
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // displayCards(data);
    });

  // return drinkDetails = {
  //   cocktailName: data.drinks[0].strDrink,
  //   cocktailImg: data.drinks[0].strDrinkThumb,
  //   glassType: data.drinks[0].strGlass,
  //   ingredients: data.drinks[0].strIngredient[1],
  //   instructions: data.drinks[0].strInstructions,
  //   measurements: [data.drinks[0].strMeasure[1]]

  // }
};

var character = Math.floor(Math.random() * 826);

console.log(character);

var rickandmortyURL = `https://rickandmortyapi.com/api/character/${character}`;

fetch(rickandmortyURL, {
  method: "GET",
})
  .then(function (response) {
    if (!response.ok) {
      throw new Error("Wubba-lubba-dub-dub! Bad network response");
    }
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    var avatar = data.id;
    var rickandmortyImageURL = `https://rickandmortyapi.com/api/character/avatar/${avatar}.jpeg`;

    document.getElementById('first-drink-image').src = `${rickandmortyImageURL}`

    console.log(rickandmortyImageURL);
  });


// for loops for ingredients and measurement arrays
// drinkDetails.ingredients.forEach(function(ingredients, j) {
//   var ingredients = document.createElement('h3');
//   PARENT.appendChild(ingredients);
// });

// drinkDetails.measurements.forEach(function(measurements, k) {
//   var measurements = document.createElement('h5');
//   PARENT.appendChild(measurements);
// })

// for (var j = 1; j < 16; j++) {
//   var ingredients = document.createElement('h3');
//   PARENT.appendChild(ingredients);
//   ingredients.textContent = [data.drinks[i].strIngredient[j]];
// };

// for (var k = 1; k < 16; k++) {
//   var measurements = document.createElement('li');
//   // if (data.drinks[i].strMeasure[k] == null) {
//   //   return null;
//   // } else {
//   PARENT.appendChild(measurements);
//   measurements.textContent = [data.drinks[i].strMeasure[k]];
//   // }
// };


// // TODO function to SHOW the cocktail to the user, populate the cocktail cards:

// // TODO card display functions
// function displayCards() {

//   // loop through the 5 options 
//   var drinkArray; // = (pulled data for character and drink)
//   var mortyArray;
//   $.each(drinkArray, (i) => {
//     var cardList = $('#card-list');
//     var characterImg; // = cardData[i].image;
//     var characterName; // = cardData[i].name;
//     var drinkImg; // = cardData[i].image;
//     var drinkName; // = cardData[i].name;


//     cardList.append(`
//     <li class=cards card-${[i] + 1}>
//           <div id='drink-card'>
//             //<h3>${characterName}'s Drink</h3>
//             //<img src=${characterImg}>
//             <div id="card-content">
//               <h4>${data.drinks[i].strDrink}</h4>
//               <img src=${data.drinks[i].strDrinkThumb}>
//               <h5>ingredients</h5>
//               <ul id='ingredient-list'> // for loop for ingredients directions data.drinks[i].strIngredient[j]
//                 <li>${data.drinks[i].strIngredient[j]}</li>
//                 <li>${data.drinks[i].strIngredient[j]}</li>
//                 <li>${data.drinks[i].strIngredient[j]}</li>
//               </ul>
//               <h4>Directions</h4>
//               <ol id='directions-list'> //for loop for data.drinks[i].strInstructions[k]
//                 //<li>${data.drinks[i].strInstructions[k]}</li>
//                 //<li>${data.drinks[i].strInstructions[k]}</li>
//                 //<li>${data.drinks[i].strInstructions[k]}</li>
//               </ol>
//             </div>
//           </div>
//         </li>
//     `)
//   })
//   showCocktail();
// };


// function showCocktail(data) {

// };



// class toggle for opening card set
$(document).ready(function() {

$('.cards').on('dblclick', () =>{
  $('.cards').toggleClass('transition')
});
$('.cards').on('click', () =>{
  $('.cards').toggleClass('expand')
});
});



// DATA from the function getDetails:
  // this would show data for specific drink at index[i]
    // location DRINK NAME: data.drinks[i].strDrink;
    // location of DRINK PIC: data.drinks[i].strDrinkThumb;
    // location GLASS TYPE: data.drinks[i].strGlass;
    // location INGREDIENTS: data.drinks[i].strIngredient1;  the last number goes 1-15 depending on how many ingredients
    // location INSTRUCTIONS: data.drinks[i].strInstructions;
    // location MEASUREMENT: data.drinks[i].strMeasure1;   the last number goes 1-15 depending on how many measurements (one measure per ingredient).

// DATA from the functions for IDs
    // location ID: data.drinks[i].idDrink;



