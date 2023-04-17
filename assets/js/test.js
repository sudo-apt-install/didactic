var rickandmortyURL = "https://rickandmortyapi.com/api/character";

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
