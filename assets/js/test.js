var page = Math.floor(Math.random() * 42);

console.log(page)

var rickandmortyURL = `https://rickandmortyapi.com/api/character/?page=${page}`;
var avatar = 2;
var rickandmortyImage = `https://rickandmortyapi.com/api/character/avatar/${avatar}.jpeg`

fetch(rickandmortyURL, {
    method: 'GET',
  })

  .then(function (response) {
    if (!response.ok) {
      throw new Error('Wubba-lubba-dub-dub! Bad network response');
    }
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
