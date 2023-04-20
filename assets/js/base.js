// array of base liquor choices, if empty set up array
var baseLiquorChoices =
  JSON.parse(localStorage.getItem("base-liquor-choices")) || [];
const baseLiquorEl = document.getElementById("drop-down");

baseLiquorEl.addEventListener("change", () => {
  baseLiquor = baseLiquorEl.value;
});

// function to save base liquor input to local storage
function saveBaseLiquor() {
  // clear base liquor input field after submission
  baseLiquorEl.value = "";
  console.log(baseLiquor);
  baseLiquorChoices.push(baseLiquor);
  localStorage.setItem("base-liquor", JSON.stringify(baseLiquorChoices));
};

var submitBtnEl = document.getElementById("submitBtn");
submitBtnEl.addEventListener("click", function (event) {
  event.preventDefault();

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
});

// functions to get the cocktail ID number, depending on user input(s)
// CARD ONE
APIkey = 1;
function getCocktailBaseOne(baseLiquor) {
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

      getDetailsOne(data.drinks[0].idDrink);
    });
};

// function for getting rest of ingredients and directions depending on cocktail ID
function getDetailsOne(cocktailID) {
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

      displayCardsOne(data);
    });
};

function displayCardsOne(data) {

  var drinkNameOneEl = document.getElementById('drink-name-one');
  var drinkImgOneEl = document.getElementById('drink-img-one');
  var ingredientsOneEl = document.getElementById('ingredients-one');
  var directionsOneEl = document.getElementById('directions-one');
  // var measurementsOneEl = document.getElementById('measurements-one');

  drinkNameOneEl.innerHTML = data.drinks[0].strDrink;

  // clears any pervious image
  drinkImgOneEl.textContent = '';
  // makes new drink image
  var drinkImgOne = document.createElement('img');
  drinkImgOne.setAttribute('class', 'drink-image');
  drinkImgOne.src = data.drinks[0].strDrinkThumb;
  drinkImgOneEl.appendChild(drinkImgOne);
  console.log(data);

  var ingredientsOneCard = data.drinks[0]
  for (var key in ingredientsOneCard) {
    // console.log(key);
    // console.log(ingredientsOneCard[key]);
    if (key.includes('strIngredient') && ingredientsOneCard[key] !== null) {
      // console.log(key, ingredientsOneCard[key]);
      var ingredientsOne = document.createElement('li');
      ingredientsOne.textContent = ingredientsOneCard[key];
      // console.log(ingredientsOne);
      ingredientsOneEl.appendChild(ingredientsOne);
    }

  }

  directionsOneEl.innerHTML = data.drinks[0].strInstructions;
};

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

      getDetailsTwo(data.drinks[1].idDrink);
    });
};

function getDetailsTwo(cocktailID) {
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

      displayCardsTwo(data);
    });
};
function displayCardsTwo(data) {
  // second card
  var drinkNameTwoEl = document.getElementById('drink-name-two');
  var drinkImgTwoEl = document.getElementById('drink-img-two');
  var ingredientsTwoEl = document.getElementById('ingredients-two');
  var directionsTwoEl = document.getElementById('directions-two');
  // var measurementsOneEl = document.getElementById('measurements-two');

  drinkNameTwoEl.innerHTML = data.drinks[0].strDrink;

  // clears any pervious image
  drinkImgTwoEl.textContent = '';
  // makes new drink image
  var drinkImgTwo = document.createElement('img');
  drinkImgTwo.setAttribute('class', 'drink-image');
  drinkImgTwo.src = data.drinks[0].strDrinkThumb;
  drinkImgTwoEl.appendChild(drinkImgTwo);

  var ingredientsTwoCard = data.drinks[0]
  for (var key in ingredientsTwoCard) {
    // console.log(key);
    // console.log(ingredientsTwoCard[key]);
    if (key.includes('strIngredient') && ingredientsTwoCard[key] !== null) {
      // console.log(key, ingredientsTwoCard[key]);
      var ingredientsTwo = document.createElement('li');
      ingredientsTwo.textContent = ingredientsTwoCard[key];
      // console.log(ingredientsTwo);
      ingredientsTwoEl.appendChild(ingredientsTwo);
    }

  }
  directionsTwoEl.innerHTML = data.drinks[0].strInstructions;
};

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

      getDetailsThree(data.drinks[1].idDrink);
    });
};
function getDetailsThree(cocktailID) {
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

      displayCardsThree(data);
    });


};
function displayCardsThree(data) {
  // third card
  var drinkNameThreeEl = document.getElementById('drink-name-three');
  var drinkImgThreeEl = document.getElementById('drink-img-three');
  var ingredientsThreeEl = document.getElementById('ingredients-three');
  var directionsThreeEl = document.getElementById('directions-three');
  // var measurementsOneEl = document.getElementById('measurements-two');

  drinkNameThreeEl.innerHTML = data.drinks[0].strDrink;

  // clears any pervious image
  drinkImgThreeEl.textContent = '';
  // makes new drink image
  var drinkImgThree = document.createElement('img');
  drinkImgThree.setAttribute('class', 'drink-image');
  drinkImgThree.src = data.drinks[0].strDrinkThumb;
  drinkImgThreeEl.appendChild(drinkImgThree);

  var ingredientsThreeCard = data.drinks[0]
  for (var key in ingredientsThreeCard) {
    // console.log(key);
    // console.log(ingredientsThreeCard[key]);
    if (key.includes('strIngredient') && ingredientsThreeCard[key] !== null) {
      // console.log(key, ingredientsThreeCard[key]);
      var ingredientsThree = document.createElement('li');
      ingredientsThree.textContent = ingredientsThreeCard[key];
      // console.log(ingredientsThree);
      ingredientsThreeEl.appendChild(ingredientsThree);
    }
  }
  directionsThreeEl.innerHTML = data.drinks[0].strInstructions;
};

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
        // !we need to use a modal here, not an alert
        alert("wubba-lubba-dub-dub!  No results, try again!");
      }


      getDetailsFour(data.drinks[3].idDrink);
    });
};
function getDetailsFour(cocktailID) {
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

      displayCardsFour(data);
    });


};
function displayCardsFour(data) {
  var drinkNameFourEl = document.getElementById('drink-name-four');
  var drinkImgFourEl = document.getElementById('drink-img-four');
  var ingredientsFourEl = document.getElementById('ingredients-four');
  var directionsFourEl = document.getElementById('directions-four');
  // var measurementsOneEl = document.getElementById('measurements-two');

  drinkNameFourEl.innerHTML = data.drinks[0].strDrink;

  // clears any pervious image
  drinkImgFourEl.textContent = '';
  // makes new drink image
  var drinkImgFour = document.createElement('img');
  drinkImgFour.setAttribute('class', 'drink-image');
  drinkImgFour.src = data.drinks[0].strDrinkThumb;
  drinkImgFourEl.appendChild(drinkImgFour);

  var ingredientsFourCard = data.drinks[0]
  for (var key in ingredientsFourCard) {
    // console.log(key);
    // console.log(ingredientsFourCard[key]);
    if (key.includes('strIngredient') && ingredientsFourCard[key] !== null) {
      // console.log(key, ingredientsFourCard[key]);
      var ingredientsFour = document.createElement('li');
      ingredientsFour.textContent = ingredientsFourCard[key];
      // console.log(ingredientsFour);
      ingredientsFourEl.appendChild(ingredientsFour);
    }
  }
  directionsFourEl.innerHTML = data.drinks[0].strInstructions;
};

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


      getDetailsFive(data.drinks[4].idDrink);

    });
};
function getDetailsFive(cocktailID) {
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

      displayCardsFive(data);
    });


};
function displayCardsFive(data) {
  // second card
  var drinkNameFiveEl = document.getElementById('drink-name-five');
  var drinkImgFiveEl = document.getElementById('drink-img-five');
  var ingredientsFiveEl = document.getElementById('ingredients-five');
  var directionsFiveEl = document.getElementById('directions-five');
  // var measurementsOneEl = document.getElementById('measurements-five');

  drinkNameFiveEl.innerHTML = data.drinks[0].strDrink;

  // clears any pervious image
  drinkImgFiveEl.textContent = '';
  // makes new drink image
  var drinkImgFive = document.createElement('img');
  drinkImgFive.setAttribute('class', 'drink-image');
  drinkImgFive.src = data.drinks[0].strDrinkThumb;
  drinkImgFiveEl.appendChild(drinkImgFive);

  var ingredientsFiveCard = data.drinks[0]
  for (var key in ingredientsFiveCard) {
    // console.log(key);
    // console.log(ingredientsFiveCard[key]);
    if (key.includes('strIngredient') && ingredientsFiveCard[key] !== null) {
      // console.log(key, ingredientsFiveCard[key]);
      var ingredientsFive = document.createElement('li');
      ingredientsFive.textContent = ingredientsFiveCard[key];
      // console.log(ingredientsFive);
      ingredientsFiveEl.appendChild(ingredientsFive);
    }
  }
  directionsFiveEl.innerHTML = data.drinks[0].strInstructions;
};















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

      document.getElementById('first-drink-image').src = `${rickandmortyImageURL}`

      console.log(rickandmortyImageURL);
    });
    
};
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

      document.getElementById('second-drink-image').src = `${rickandmortyImageURL}`

      console.log(rickandmortyImageURL);
    });

};
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

      document.getElementById('third-drink-image').src = `${rickandmortyImageURL}`

      console.log(rickandmortyImageURL);
    });

};
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

      document.getElementById('fourth-drink-image').src = `${rickandmortyImageURL}`

      console.log(rickandmortyImageURL);
    });

};
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

      document.getElementById('fifth-drink-image').src = `${rickandmortyImageURL}`

      console.log(rickandmortyImageURL);
    });

};

$(document).ready(function () {

  $('.cards').on('dblclick', () => {
    $('.cards').toggleClass('transition')
  });
  $('.cards').on('click', () => {
    $('.cards').toggleClass('expand')
  });
});

