// array of base liquor choices, if empty set up array
var baseLiquorChoices =
  JSON.parse(localStorage.getItem("base-liquor-choices")) || [];
const baseLiquorEl = document.getElementById("drop-down");

baseLiquorEl.addEventListener("change", () => {
  baseLiquor = baseLiquorEl.value;
});

// function to save base liquor input to local storage
function saveBaseLiquor() {
  console.log(baseLiquor);
  baseLiquorChoices.push(baseLiquor);
  localStorage.setItem("base-liquor", JSON.stringify(baseLiquorChoices));
}

var submitBtnEl = document.getElementById("submitBtn");
submitBtnEl.addEventListener("click", function (event) {
  event.preventDefault();
  if (!baseLiquorEl.value) {
   $('#form1').append(`<div class="callout alert" data-closable>
  <h5>This is Important!</h5>
  <p> Pick a base liquor Dawg!</p>
  <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
    <span aria-hidden="true">&times;</span>
  </button>
</div>`)
  }
  saveBaseLiquor();
  getCocktailBaseOne(baseLiquor);
  getCocktailBaseTwo(baseLiquor);
  getCocktailBaseThree(baseLiquor);
  getCocktailBaseFour(baseLiquor);
  getCocktailBaseFive(baseLiquor);
  getCharOne();
  getCharTwo();
  getCharThree();
  getCharFour();
  getCharFive();
  getPreviousCards();
  $(".cards").css("display", "inline-block");
});

// functions to get the cocktail ID number, depending on user input(s)
// CARD ONE
APIkey = 1;
function getCocktailBaseOne(baseLiquor) {
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
      console.log(data);
      if (data.length === 0) {
        alert("wubba-lubba-dub-dub!  No results, try again!");
      }
      var randomNumber = Math.floor(Math.random() * data.drinks.length);
      getDetailsOne(data.drinks[randomNumber].idDrink);
    });
}

var previousDrinks = new Set();

// function for getting rest of ingredients and directions depending on cocktail ID
function getDetailsOne(cocktailID) {
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
        console.log(data);
        arrOneData.push(data);
        localStorage.setItem("drink-one-data", JSON.stringify(arrOneData));

        displayCardsOne(data);
        previousDrinks.add(cocktailID);
      });
  } else {
    getDetailsOne(cocktailID);
  }
}

function displayCardsOne(data) {
  var drinkNameOneEl = document.getElementById("drink-name-one");
  var drinkImgOneEl = document.getElementById("drink-img-one");
  var ingredientsOneEl = document.getElementById("ingredients-one");
  var directionsOneEl = document.getElementById("directions-one");
  // var measurementsOneEl = document.getElementById('measurements-one');

  drinkNameOneEl.innerHTML = data.drinks[0].strDrink;

  // clears any previous image
  drinkImgOneEl.textContent = "";
  // makes new drink image
  var drinkImgOne = document.createElement("img");
  drinkImgOne.setAttribute("class", "drink-image");
  drinkImgOne.src = data.drinks[0].strDrinkThumb;
  drinkImgOneEl.appendChild(drinkImgOne);
  console.log(data);

  // clears previous ingredients
  ingredientsOneEl.textContent = "";
  var ingredientsOneCard = data.drinks[0];
  for (var key in ingredientsOneCard) {
    if (key.includes("strIngredient") && ingredientsOneCard[key] !== null) {
      var ingredientsOne = document.createElement("li");
      ingredientsOne.textContent = ingredientsOneCard[key];
      ingredientsOneEl.appendChild(ingredientsOne);
    }
  }

  directionsOneEl.innerHTML = data.drinks[0].strInstructions;
}

// CARD TWO
function getCocktailBaseTwo(baseLiquor) {
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
      console.log(data);
      if (data.length === 0) {
        // !we need to use a modal here, not an alert
        alert("wubba-lubba-dub-dub!  No results, try again!");
      }
      var randomNumber = Math.floor(Math.random() * data.drinks.length);
      getDetailsTwo(data.drinks[randomNumber].idDrink);
    });
}

function getDetailsTwo(cocktailID) {
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
        console.log(data);
        arrTwoData.push(data);
        localStorage.setItem("drink-two-data", JSON.stringify(arrTwoData));
        displayCardsTwo(data);
        previousDrinks.add(cocktailID);
      });
  } else {
    getDetailsTwo(cocktailID);
  }
}
function displayCardsTwo(data) {
  // second card
  var drinkNameTwoEl = document.getElementById("drink-name-two");
  var drinkImgTwoEl = document.getElementById("drink-img-two");
  var ingredientsTwoEl = document.getElementById("ingredients-two");
  var directionsTwoEl = document.getElementById("directions-two");

  drinkNameTwoEl.innerHTML = data.drinks[0].strDrink;

  // clears any pervious image
  drinkImgTwoEl.textContent = "";
  // makes new drink image
  var drinkImgTwo = document.createElement("img");
  drinkImgTwo.setAttribute("class", "drink-image");
  drinkImgTwo.src = data.drinks[0].strDrinkThumb;
  drinkImgTwoEl.appendChild(drinkImgTwo);

  // clears previous ingredients
  ingredientsTwoEl.textContent = "";
  var ingredientsTwoCard = data.drinks[0];
  for (var key in ingredientsTwoCard) {
    if (key.includes("strIngredient") && ingredientsTwoCard[key] !== null) {
      var ingredientsTwo = document.createElement("li");
      ingredientsTwo.textContent = ingredientsTwoCard[key];
      ingredientsTwoEl.appendChild(ingredientsTwo);
    }
  }
  directionsTwoEl.innerHTML = data.drinks[0].strInstructions;
}

// CARD THREE
function getCocktailBaseThree(baseLiquor) {
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
      console.log(data);
      if (data.length === 0) {
        // !we need to use a modal here, not an alert
        alert("wubba-lubba-dub-dub!  No results, try again!");
      }
      var randomNumber = Math.floor(Math.random() * data.drinks.length);
      getDetailsThree(data.drinks[randomNumber].idDrink);
    });
}
function getDetailsThree(cocktailID) {
  if (!previousDrinks.has(cocktailID)) {
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
        arrThreeData.push(data);
        localStorage.setItem("drink-three-data", JSON.stringify(arrThreeData));
        previousDrinks.add(cocktailID);

        displayCardsThree(data);
      });
  } else {
    getDetailsThree();
  }
}
function displayCardsThree(data) {
  // third card
  var drinkNameThreeEl = document.getElementById("drink-name-three");
  var drinkImgThreeEl = document.getElementById("drink-img-three");
  var ingredientsThreeEl = document.getElementById("ingredients-three");
  var directionsThreeEl = document.getElementById("directions-three");

  drinkNameThreeEl.innerHTML = data.drinks[0].strDrink;

  // clears any pervious image
  drinkImgThreeEl.textContent = "";
  // makes new drink image
  var drinkImgThree = document.createElement("img");
  drinkImgThree.setAttribute("class", "drink-image");
  drinkImgThree.src = data.drinks[0].strDrinkThumb;
  drinkImgThreeEl.appendChild(drinkImgThree);

  // clears previous ingredients
  ingredientsThreeEl.textContent = "";
  var ingredientsThreeCard = data.drinks[0];
  for (var key in ingredientsThreeCard) {
    if (key.includes("strIngredient") && ingredientsThreeCard[key] !== null) {
      var ingredientsThree = document.createElement("li");
      ingredientsThree.textContent = ingredientsThreeCard[key];
      ingredientsThreeEl.appendChild(ingredientsThree);
    }
  }
  directionsThreeEl.innerHTML = data.drinks[0].strInstructions;
}

// CARD FOUR
function getCocktailBaseFour(baseLiquor) {
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
      console.log(data);
      if (data.length === 0) {
        alert("wubba-lubba-dub-dub!  No results, try again!");
      }

      var randomNumber = Math.floor(Math.random() * data.drinks.length);
      getDetailsFour(data.drinks[randomNumber].idDrink);
    });
}
function getDetailsFour(cocktailID) {
  if (!previousDrinks.has(cocktailID)) {
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
        arrFourData.push(data);
        localStorage.setItem("drink-four-data", JSON.stringify(arrFourData));
        previousDrinks.add(cocktailID);

        displayCardsFour(data);
      });
  } else {
    getDetailsFour();
  }
}
function displayCardsFour(data) {
  var drinkNameFourEl = document.getElementById("drink-name-four");
  var drinkImgFourEl = document.getElementById("drink-img-four");
  var ingredientsFourEl = document.getElementById("ingredients-four");
  var directionsFourEl = document.getElementById("directions-four");

  drinkNameFourEl.innerHTML = data.drinks[0].strDrink;

  // clears any pervious image
  drinkImgFourEl.textContent = "";
  // makes new drink image
  var drinkImgFour = document.createElement("img");
  drinkImgFour.setAttribute("class", "drink-image");
  drinkImgFour.src = data.drinks[0].strDrinkThumb;
  drinkImgFourEl.appendChild(drinkImgFour);

  // clears previous ingredients
  ingredientsFourEl.textContent = "";
  var ingredientsFourCard = data.drinks[0];
  for (var key in ingredientsFourCard) {
    if (key.includes("strIngredient") && ingredientsFourCard[key] !== null) {
      var ingredientsFour = document.createElement("li");
      ingredientsFour.textContent = ingredientsFourCard[key];
      ingredientsFourEl.appendChild(ingredientsFour);
    }
  }
  directionsFourEl.innerHTML = data.drinks[0].strInstructions;
}

// CARD FIVE
function getCocktailBaseFive(baseLiquor) {
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
      console.log(data);
      if (data.length === 0) {
        // !we need to use a modal here, not an alert
        alert("wubba-lubba-dub-dub!  No results, try again!");
      }

      var randomNumber = Math.floor(Math.random() * data.drinks.length);
      getDetailsFive(data.drinks[randomNumber].idDrink);
    });
}
function getDetailsFive(cocktailID) {
  if (!previousDrinks.has(cocktailID)) {
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
        arrFiveData.push(data);
        localStorage.setItem("drink-five-data", JSON.stringify(arrFiveData));
        previousDrinks.add(cocktailID);
        displayCardsFive(data);
      });
  } else {
    getDetailsFive();
  }
}
function displayCardsFive(data) {
  // second card
  var drinkNameFiveEl = document.getElementById("drink-name-five");
  var drinkImgFiveEl = document.getElementById("drink-img-five");
  var ingredientsFiveEl = document.getElementById("ingredients-five");
  var directionsFiveEl = document.getElementById("directions-five");

  drinkNameFiveEl.innerHTML = data.drinks[0].strDrink;

  // clears any pervious image
  drinkImgFiveEl.textContent = "";
  // makes new drink image
  var drinkImgFive = document.createElement("img");
  drinkImgFive.setAttribute("class", "drink-image");
  drinkImgFive.src = data.drinks[0].strDrinkThumb;
  drinkImgFiveEl.appendChild(drinkImgFive);

  // clears previous ingredients
  ingredientsFiveEl.textContent = "";
  var ingredientsFiveCard = data.drinks[0];
  for (var key in ingredientsFiveCard) {
    if (key.includes("strIngredient") && ingredientsFiveCard[key] !== null) {
      var ingredientsFive = document.createElement("li");
      ingredientsFive.textContent = ingredientsFiveCard[key];
      ingredientsFiveEl.appendChild(ingredientsFive);
    }
  }
  directionsFiveEl.innerHTML = data.drinks[0].strInstructions;
}

function getCharOne() {
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
      console.log(data);
      var avatar = data.id;
      var rickandmortyImageURL = `https://rickandmortyapi.com/api/character/avatar/${avatar}.jpeg`;
      var characterName = data.name;
      console.log(characterName);

      document.getElementById(
        "first-drink-image"
      ).src = `${rickandmortyImageURL}`;
      var charcterH3 = document.getElementById("first-character");
      charcterH3.innerHTML = `${characterName}'s Drink`;

      console.log(rickandmortyImageURL);
      arrCharOne.push(data);
      localStorage.setItem("char-1", JSON.stringify(arrCharOne));
    });
}
function getCharTwo() {
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
      console.log(data);
      var avatar = data.id;
      var rickandmortyImageURL = `https://rickandmortyapi.com/api/character/avatar/${avatar}.jpeg`;
      var characterName2 = data.name;

      document.getElementById(
        "second-drink-image"
      ).src = `${rickandmortyImageURL}`;

      var charcter2H3 = document.getElementById("second-character");
      charcter2H3.innerHTML = `${characterName2}'s Drink`;

      console.log(rickandmortyImageURL);
      arrCharTwo.push(data);
      localStorage.setItem("char-2", JSON.stringify(arrCharTwo));
    });
}
function getCharThree() {
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
      console.log(data);
      var avatar = data.id;
      var rickandmortyImageURL = `https://rickandmortyapi.com/api/character/avatar/${avatar}.jpeg`;
      characterName3 = data.name;

      document.getElementById(
        "third-drink-image"
      ).src = `${rickandmortyImageURL}`;

      var charcter3H3 = document.getElementById("third-character");
      charcter3H3.innerHTML = `${characterName3}'s Drink`;

      console.log(rickandmortyImageURL);
      arrCharThree.push(data);
      localStorage.setItem("char-3", JSON.stringify(arrCharThree));
    });
}
function getCharFour() {
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
      console.log(data);
      var avatar = data.id;
      var rickandmortyImageURL = `https://rickandmortyapi.com/api/character/avatar/${avatar}.jpeg`;
      characterName4 = data.name;

      document.getElementById(
        "fourth-drink-image"
      ).src = `${rickandmortyImageURL}`;

      var charcter4H3 = document.getElementById("fourth-character");
      charcter4H3.innerHTML = `${characterName4}'s Drink`;

      console.log(rickandmortyImageURL);
      arrCharFour.push(data);
      localStorage.setItem("char-4", JSON.stringify(arrCharFour));
    });
}
function getCharFive() {
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
      console.log(data);
      var avatar = data.id;
      var rickandmortyImageURL = `https://rickandmortyapi.com/api/character/avatar/${avatar}.jpeg`;
      characterName5 = data.name;
      
      document.getElementById(
        "fifth-drink-image"
        ).src = `${rickandmortyImageURL}`;
        var charcter5H3 = document.getElementById("fifth-character");
        charcter5H3.innerHTML = `${characterName5}'s Drink`;
        
        console.log(rickandmortyImageURL);
        arrCharFive.push(data);
        localStorage.setItem("char-5", JSON.stringify(arrCharFive));
    });
}

$(document).ready(function () {
  $(".card-split").on("dblclick", () => {
    $(".cards").toggleClass("transition");
  });
  $(".cards").on("click", function () {
    $(this).toggleClass("expand");
  });
});


// recall button and recall function

var arrOneData =
  JSON.parse(localStorage.getItem("drink-one-data")) || [];
var arrTwoData =
  JSON.parse(localStorage.getItem("drink-two-data")) || [];
var arrThreeData =
  JSON.parse(localStorage.getItem("drink-three-data")) || [];
var arrFourData =
  JSON.parse(localStorage.getItem("drink-four-data")) || [];
var arrFiveData =
  JSON.parse(localStorage.getItem("drink-five-data")) || [];

var arrCharOne =
  JSON.parse(localStorage.getItem("char-1")) || [];
var arrCharTwo =
  JSON.parse(localStorage.getItem("char-2")) || [];
var arrCharThree =
  JSON.parse(localStorage.getItem("char-3")) || [];
var arrCharFour =
  JSON.parse(localStorage.getItem("char-4")) || [];
var arrCharFive =
  JSON.parse(localStorage.getItem("char-5")) || [];



function getPreviousCards() {
  var recallBtnDiv = document.getElementById('recallBtnDiv');
  recallBtnDiv.innerHTML = '';


  var recallBtn = document.createElement('button');
  recallBtn.setAttribute('id', 'recallBtn');
  recallBtn.setAttribute('type', 'button');
  recallBtn.setAttribute('class', 'ourButton button');
  recallBtnDiv.appendChild(recallBtn);



  recallBtn.innerHTML = "Last Round";
  recallBtn.addEventListener('click', function () {
    console.log("test test tests tests");
    displayCardsOne(arrOneData.at(-2));
    displayCardsTwo(arrTwoData.at(-2));
    displayCardsThree(arrThreeData.at(-2));
    displayCardsFour(arrFourData.at(-2));
    displayCardsFive(arrFiveData.at(-2));

    charOneAgain();
    charTwoAgain();
    charThreeAgain();
    charFourAgain();
    charFiveAgain();
  });
};

function charOneAgain() {
  var avatar = arrCharOne.at(-2).id;
  var rickandmortyImageURL = `https://rickandmortyapi.com/api/character/avatar/${avatar}.jpeg`;
  var characterName = arrCharOne.at(-2).name;
  console.log(characterName);

  document.getElementById(
    "first-drink-image"
  ).src = `${rickandmortyImageURL}`;
  var charcterH3 = document.getElementById("first-character");
  charcterH3.innerHTML = `${characterName}'s Drink`;
};

function charTwoAgain() {
  var avatar = arrCharTwo.at(-2).id;
  var rickandmortyImageURL = `https://rickandmortyapi.com/api/character/avatar/${avatar}.jpeg`;
  var characterName = arrCharTwo.at(-2).name;
  console.log(characterName);

  document.getElementById(
    "second-drink-image"
  ).src = `${rickandmortyImageURL}`;
  var charcter2H3 = document.getElementById("second-character");
  charcter2H3.innerHTML = `${characterName}'s Drink`;
};

function charThreeAgain() {
  var avatar = arrCharThree.at(-2).id;
  var rickandmortyImageURL = `https://rickandmortyapi.com/api/character/avatar/${avatar}.jpeg`;
  var characterName = arrCharThree.at(-2).name;
  console.log(characterName);

  document.getElementById(
    "third-drink-image"
  ).src = `${rickandmortyImageURL}`;
  var charcter3H3 = document.getElementById("third-character");
  charcter3H3.innerHTML = `${characterName}'s Drink`;
};

function charFourAgain() {
  var avatar = arrCharFour.at(-2).id;
  var rickandmortyImageURL = `https://rickandmortyapi.com/api/character/avatar/${avatar}.jpeg`;
  var characterName = arrCharFour.at(-2).name;
  console.log(characterName);

  document.getElementById(
    "fourth-drink-image"
  ).src = `${rickandmortyImageURL}`;
  var charcter4H3 = document.getElementById("fourth-character");
  charcter4H3.innerHTML = `${characterName}'s Drink`;
};

function charFiveAgain() {
  var avatar = arrCharFive.at(-2).id;
  var rickandmortyImageURL = `https://rickandmortyapi.com/api/character/avatar/${avatar}.jpeg`;
  var characterName = arrCharFive.at(-2).name;
  console.log(characterName);

  document.getElementById(
    "fifth-drink-image"
  ).src = `${rickandmortyImageURL}`;
  var charcter5H3 = document.getElementById("fifth-character");
  charcter5H3.innerHTML = `${characterName}'s Drink`;
};