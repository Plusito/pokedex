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

    // const pokeType = document.createElement("div");

    //назначаем классы узлам
    card.classList.add("card");
    //дальше сам домашнее задание
    cardT.classList.add("card-top");
    cardB.classList.add("card-bottom");
    pokeImg.classList.add("image");
    pokeId.classList.add("id");
    pokeName.classList.add("name");
    pokeTypes.classList.add("types");

    //устанавливаем контент
    pokeImg.src = img;
    pokeId.textContent = `ID/${id}`;
    pokeName.textContent = name;

    //Создание структуры
    card.appendChild(cardT);
    card.appendChild(cardB);
    cardT.appendChild(pokeImg);
    cardT.appendChild(pokeId);
    cardB.appendChild(pokeName);

    types.forEach((t) => {
      const type = document.createElement("li");
      type.textContent = t.type.name;
      pokeTypes.appendChild(type);
    });

    cardB.appendChild(pokeTypes);
    grid.appendChild(card);

    //ONLY EVO
    if (evo != null) {
      const pokeEvo = document.createElement("div");
      const evoFrom = document.createElement("p");
      const evoName = document.createElement("h2");

      pokeEvo.classList.add("evo");

      evoFrom.textContent = "Evoluciona de:";
      evoName.textContent = evo;

      pokeEvo.appendChild(evoFrom);
      pokeEvo.appendChild(evoName);

      cardB.appendChild(pokeEvo);
    }
  }

  async function getPokemons() {
    let pokemons = [];
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
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
      const evolution = speciesInfo.evolves_from_species?.name || null;
      return {
        img: image,
        id: id,
        name: name,
        types: types,
        evo: evolution,
      };
    });
    pokemons = await Promise.all(pokemonPromises);
    return pokemons;
  }

  async function drawGrid() {
    const pokemonsToDraw = await getPokemons();

    pokemonsToDraw.forEach((pokemon) => {
      createCard(
        pokemon.img,
        pokemon.id,
        pokemon.name,
        pokemon.types,
        pokemon.evo
      );
    });
  }

  drawGrid();
});
