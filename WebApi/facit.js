/****************\
 ** Exercise 1 **
\****************/
// jag lägger url variabeln utanför scope så att den kan nås senare i Exercise 2-4
let url;
{
  url = new URL("https://localhost");

  url.hostname = "api.openweathermap.org";
  url.pathname = "/data/2.5/weather";
  url.searchParams.set("q", "Stockholm");
  url.searchParams.set("appid", "ac5d516646126253361022bafa972296");
  url.searchParams.set("mode", "json");
  url.searchParams.set("units", "metric");
  url.searchParams.set("lang", "se");

  for (let [key, val] of url.searchParams) {
    console.log(`${key}:${val}`);
  }

  document.getElementById("ex-1-out").innerText = url;
}

/****************\
 ** Exercise 2 **
\****************/
document.getElementById("ex-2-btn").onclick = function (event) {
  const out = document.getElementById("ex-2-out");

  fetch(url)
    .then((response) => {
      // vi avbryter om svaret
      if (!response.ok) throw `${response.status} ${response.statusText}`;
      return response.text();
    })
    .then((text) => {
      const prettyJSON = JSON.stringify(JSON.parse(text), null, " ");
      out.innerText = prettyJSON;
    })
    .catch((error) => console.log(error));
};

/****************\
 ** Exercise 3 **
\****************/
document.getElementById("ex-3-btn").onclick = function (event) {
  const out = document.getElementById("ex-3-out");
  const xhr = new XMLHttpRequest();

  xhr.open("GET", url);
  xhr.responseType = "text";

  xhr.onload = function (event) {
    console.log(
      `Weather request status: ${event.target.status} ${event.target.statusText}`
    );

    if (event.target.status === 200) {
      // Begäran lyckades
      let text = event.target.response;
      let prettyJSON = JSON.stringify(JSON.parse(text), null, " ");
      out.innerText = prettyJSON;
    }
  };

  xhr.onerror = function (e) {
    console.log(url.origin + " could not be reached");
  };

  xhr.send();
};

/****************\
 ** Exercise 4 **
\****************/
document.getElementById("ex-4-btn").onclick = function (event) {
  const out = document.getElementById("ex-4-out");

  fetch(url)
    .then((response) => {
      if (!response.ok) throw `${response.status} ${response.statusText}`;
      return response.json();
    })
    .then((weatherReport) => {
      const mainWeather = weatherReport.weather[0];
      const title = mainWeather.main;
      const flavortext = mainWeather.description;

      const imgUrl = new URL("http://openweathermap.org");
      imgUrl.pathname = `/img/wn/${mainWeather.icon}@4x.png`;

      const mainTemp = weatherReport.main;
      const temp = mainTemp.temp;
      const feelsLike = mainTemp.feels_like;

      out.innerHTML = /* html */ `
        <h3>${title}</h3>
        <img src="${imgUrl}">
        <p>${flavortext}</p>
        <p>Det är ${temp}&#8451; men känns som ${feelsLike}&#8451;</p>
      `;
    })
    .catch((error) => console.log(error));
};

/****************\
 ** Exercise 6 **
\****************/
{
  let currentPokemonId = 1;
  fetchPokemon(currentPokemonId);

  const prevBtn = document.getElementById("ex-6-prev");
  const nextBtn = document.getElementById("ex-6-next");

  prevBtn.onclick = function () {
    if (currentPokemonId > 1) currentPokemonId -= 1;
    fetchPokemon(currentPokemonId);
  };
  nextBtn.onclick = function () {
    currentPokemonId += 1;
    fetchPokemon(currentPokemonId);
  };

  const spriteImg = document.getElementById("ex-6-sprite");
  const namePara = document.getElementById("ex-6-name");
  const flavortextPara = document.getElementById("ex-6-flavortext");

  function fetchPokemon(id) {
    const pokemonUrl = new URL("https://pokeapi.co");
    pokemonUrl.pathname = `/api/v2/pokemon/${id}`;

    fetch(pokemonUrl)
      .then((response) => {
        if (!response.ok) throw `${response.status} ${response.statusText}`;
        return response.json();
      })
      .then((pokemon) => {
        spriteImg.src = pokemon.sprites.front_default;
        namePara.textContent = pokemon.name;

        // Här fortsätter jag fetch kedjan genom att returnera en ny fetch
        return fetch(pokemon.species.url);
      })
      .then((response) => {
        if (!response.ok) throw `${response.status} ${response.statusText}`;
        return response.json();
      })
      .then((species) => {
        flavortextPara.textContent = species.flavor_text_entries[0].flavor_text;
      })
      // om något går fel i något av de fetch vi gör så kommer felet att samlas här
      .catch((error) => console.log(error));
  }
}
