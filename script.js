// fetch("https://pokeapi.co/api/v2/pokemon")
//   .then((result) => result.json())
//   .then((pokemons) => {
//     pokemons.results.forEach((pokemon) => {
//       console.log(pokemon.name);
//     });
//   });

const pokemons = [];

document.addEventListener("DOMContentLoaded", async () => {
  function createCard(img, id, name, types, evo) {
    //выбераем узел grid
    const grid = document.getElementById("grid");

    //создаем необходимые узлы
    const card = document.createElement("div");
    const cardT = document.createElement("div");
    const cardB = document.createElement("div");
    const pokeImg = document.createElement("img");
    const pokeId = document.createElement("div");
    const pokeName = document.createElement("h2");
    const pokeTypes = document.createElement("ul");
    const pokeEvo = document.createElement("");
    // const pokeType = document.createElement("div");

    //назначаем классы узлам
    card.classList.add("card");
    //дальше сам домашнее задание
    cardT.classList.add("card-top");
    cardB.classList.add("card-bottom");
    pokeImg.classList.add("image");
    pokeId.classList.add("id");
    pokeName.classList.add("name");
    pokeTypes.classList.add("type");

    //устанавливаем контент
    pokeImg.src = img;
    pokeId.textContent = `ID/${id}`;
    pokeName.textContent = name;
    pokeTypes.textContent = types;

    //Создание структуры
    card.appendChild(cardT);
    card.appendChild(cardB);
    cardT.appendChild(pokeImg);
    cardT.appendChild(pokeId);
    cardB.appendChild(pokeName);
    grid.appendChild(card);
    cardB.appendChild(types);

    //ONLY EVO
    pokeEvo.classList.add("evo");
    pokeEvo.textContent - evo;
    cardB.appendChild(evo);
  }

  async function getPokemons() {
    let pokemons = [];
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1025"
    );
    const data = await response.json();

    const pokemonPromises = data.results.map(async (element) => {
      const pokemonResponse = await fetch(element.url);
      const pokemonInfo = await pokemonResponse.json();
      const name = pokemonInfo.name;
      const image = pokemonInfo.sprites.front_default;
      const id = pokemonInfo.id;
      const types = pokemonInfo.types;
      const speciesResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${id}/`
      );
      const speciesInfo = await speciesResponse.json();
      const evolution = speciesInfo.evolves_from_species;
      return {
        img: image,
        id: id,
        name: name,
        type: types,
        evolution: evolution,
      };
    });
    pokemons = await Promise.all(pokemonPromises);
    return pokemons;
  }

  async function drawGrid() {
    const pokemonsToDraw = await getPokemons();

    pokemonsToDraw.forEach((pokemon) => {
      createCard(pokemon.img, pokemon.id, pokemon.name);
    });
  }

  drawGrid();
});
