// fetch("https://pokeapi.co/api/v2/pokemon")
//   .then((result) => result.json())
//   .then((pokemons) => {
//     pokemons.results.forEach((pokemon) => {
//       console.log(pokemon.name);
//     });
//   });

document.addEventListener("DOMContentLoaded", async () => {
  function createCard(img, id, name) {
    //выбераем узел grid
    const grid = document.getElementById("grid");

    //создаем необходимые узлы
    const card = document.createElement("div");
    const cardT = document.createElement("div");
    const cardB = document.createElement("div");
    const pokeImg = document.createElement("img");
    const pokeId = document.createElement("div");
    const pokeName = document.createElement("h2");
    // const pokeType = document.createElement("div");

    //назначаем классы узлам
    card.classList.add("card");
    //дальше сам домашнее задание
    cardT.classList.add("card-top");
    cardB.classList.add("card-bottom");
    pokeImg.classList.add("image");
    pokeId.classList.add("id");
    pokeName.classList.add("name");
    //устанавливаем контент
    pokeImg.src = img;
    pokeId.textContent = id;
    pokeName.textContent = name;

    //Создание структуры
    // card.appendChild(cardT);
    // card.appendChild(cardB);
    // cardT.appendChild(pokeImg);
    // cardT.appendChild(pokeId);
    // cardB.appendChild(pokeName);
    // grid.appendChild(card);
  }

  createCard(
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png",
    65,
    "Artem"
  );
});
