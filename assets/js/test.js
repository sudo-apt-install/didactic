
var allCardIds = [
  {
    cardH3: document.getElementById("first-character"),
    cardImg: document.getElementById("first-drink-image"),
    cardH4: document.getElementById("drink-name-one"),
    cardIngredients: document.getElementById("ingredients-one"),
    cardDirections: document.getElementById("directions-one"),
    cardDrinkImg: document.getElementById("drink-img-one"),
  },
  {
    cardH3: document.getElementById("second-character"),
    cardImg: document.getElementById("second-drink-image"),
    cardH4: document.getElementById("drink-name-two"),
    cardIngredients: document.getElementById("ingredients-two"),
    cardDirections: document.getElementById("directions-two"),
    cardDrinkImg: document.getElementById("drink-img-two"),
  },
  {
    cardH3: document.getElementById("third-character"),
    cardImg: document.getElementById("third-drink-image"),
    cardH4: document.getElementById("drink-name-three"),
    cardIngredients: document.getElementById("ingredients-three"),
    cardDirections: document.getElementById("directions-three"),
    cardDrinkImg: document.getElementById("drink-img-three"),
  },
  {
    cardH3: document.getElementById("fourth-character"),
    cardImg: document.getElementById("fourth-drink-image"),
    cardH4: document.getElementById("drink-name-four"),
    cardIngredients: document.getElementById("ingredients-four"),
    cardDirections: document.getElementById("directions-four"),
    cardDrinkImg: document.getElementById("drink-img-four"),
  },
  {
    cardH3: document.getElementById("fifth-character"),
    cardImg: document.getElementById("fifth-drink-image"),
    cardH4: document.getElementById("drink-name-five"),
    cardIngredients: document.getElementById("ingredients-five"),
    cardDirections: document.getElementById("directions-five"),
    cardDrinkImg: document.getElementById("drink-img-five"),
  },
];
var previousDrinks = new Set();

// array of base liquor choices, if empty set up array
var baseLiquorChoices =
  JSON.parse(localStorage.getItem("base-liquor-choices")) || [];
const baseLiquorEl = document.getElementById("drop-down");

baseLiquorEl.addEventListener("change", () => {
  baseLiquor = baseLiquorEl.value;
});

// function to save base liquor input to local storage
function saveBaseLiquor() {
  baseLiquorChoices.push(baseLiquor);
  localStorage.setItem("base-liquor", JSON.stringify(baseLiquorChoices));
}

var submitBtnEl = document.getElementById("submitBtn");
submitBtnEl.addEventListener("click", function (event) {
  event.preventDefault();
  if (!baseLiquorEl.value) {
    alert("gimme some basic info, Morty!");
  }
  // Call getCharacter for each card
  for (let h = 0; h < allCardIds.length; h++) {
  getCharacter(allCardIds[h]);
  saveBaseLiquor();
  getCocktailBase(allCardIds[h], baseLiquor);
}

  $(".cards").css("display", "inline-block");
});

// functions to get the cocktail ID number, depending on user input(s)
// CARD ONE
APIkey = 1;

function getCocktailBase(card, baseLiquor) {
  cocktailQueryUrl = `https://www.thecocktaildb.com/api/json/v1/${APIkey}/filter.php?i=${baseLiquor}`;
  fetch(cocktailQueryUrl, {
    method: "GET",
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Bad network response");
      }
      return response.json();
    })
    .then(function (data) {
      if (data.drinks.length === 0) {
        alert("wubba-lubba-dub-dub!  No results, try again!");
      } else {
        var randomNumber = Math.floor(Math.random() * data.drinks.length);
        var drinkImage = data.drinks[randomNumber].strDrinkThumb;
        card.cardDrinkImg.setAttribute("src", drinkImage);
        card.cardH4.textContent = data.drinks[randomNumber].strDrink;
        card.cardIngredients.textContent = data.drinks[randomNumber].strIngredient1 + ", " + data.drinks[randomNumber].strIngredient2 + ", " + data.drinks[randomNumber].strIngredient3;
        card.cardDirections.textContent = data.drinks[randomNumber].strInstructions;
      }
    });
}


// function for getting rest of ingredients and directions depending on cocktail ID
function getDrinkDetails(cocktailID) {
  if (!previousDrinks.has(cocktailID)) {
    ingredientQueryUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailID}`;
    return fetch(ingredientQueryUrl, {
      method: "GET",
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Bad network response");
        }
        return response.json();
      })
      .then(function (data) {
        displayCards(data);
        previousDrinks.add(cocktailID);
      });
  } else {
    getDrinkDetails(cocktailID);
  }
}


function displayCards(card, data) {  
  drinkImg.textContent = "";
  
  // makes new drink image
  var drinkImg = document.createElement("img");
  // clears any previous image
  drinkImg.setAttribute("class", "drink-image");
  drinkImg.src = data.drinks[0].strDrinkThumb;
  allCardIds.cardDrinkImg.appendChild(drinkImg);
  
  allCardIds.cardH4.textContent = data.drinks[0].strDrink;
  
  // clears previous ingredients
  card.cardIngredients.textContent = "";
  var ingredientsOneCard = data.drinks[0];
  for (var key in ingredientsOneCard) {
    if (key.includes("strIngredient") && ingredientsOneCard[key] !== null) {
      var ingredientsOne = document.createElement("li");
      ingredientsOne.textContent = ingredientsOneCard[key];
      ingredientsOneEl.appendChild(ingredientsOne);
    }
  }
  
  cardH4.innerHTML = data.drinks[0].strInstructions;
}

function getCharacter(card) {
  var character = Math.floor(Math.random() * 826);
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
      var avatar = data.id;
      var rickandmortyImageURL = `https://rickandmortyapi.com/api/character/avatar/${avatar}.jpeg`;
      var characterName = data.name;

      card.cardImg.src = rickandmortyImageURL;
      card.cardH3.innerHTML = `${characterName}'s Drink`;
    });
}

$(document).ready(function () {
  $(".card-split").on("dblclick", () => {
    $(".cards").toggleClass("transition");
  });
  
  $(".cards").on("click", function () {
    $(this).toggleClass("expand");
  });

  $(".cardz").on("click", function () {
    $(this).toggleClass("expand");
  });
});