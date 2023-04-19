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
  getCocktailBaseOnlyID(baseLiquor);
  // displayCards();
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
};

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
    });

  // return getDetails = {
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

  // TODO format cards 
  function displayCards() {

    // loop through the 5 options 
    var drinkArray; // = (pulled data for character and drink)
    var mortyArray;
    $.each(drinkArray, (i) => {
      var cardList = $('#card-list');
      // var characterImg; // = cardData[i].image;
      // var characterName; // = cardData[i].name;
      // var drinkImg; // = cardData[i].image;
      // var drinkName = cardData[i].name;
  
  
      cardList.append(`
      <li class=cards card-${[i] + 1}>
            <div id='drink-card'>
              <h3>${characterName[i]}'s Drink</h3>
              <img src=${rickandmortyImageURL[i]}>
              <div id="card-content">
                <h4>${data.drinks[i].strDrink}</h4>
                <img src=${data.drinks[i].strDrinkThumb}>
                <h5>ingredients</h5>
                <ul id='ingredient-list'> // for loop for ingredients directions data.drinks[i].strIngredient[j]
                  
                </ul>
                <h4>Directions</h4>
                <ol id='directions-list'> //for loop for data.drinks[i].strInstructions[k]
                  
                </ol>
              </div>
            </div>
          </li>
      `)
    })
    // showCocktail();
  };
  
  
  // function showCocktail(data) {
  
  // };

$(document).ready(function () {

  $('.card-split').on('click', () => {
    $('.cards').toggleClass('transition')
  });
 $('.cards').on("mouseenter mouseleave", function(){
  $(this).toggleClass('expand')
 })


});

