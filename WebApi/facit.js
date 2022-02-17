/****************\
 ** Exercise 1 **
\****************/
// jag lägger url variabeln utanför scope så att den kan nås senare i Exercise 2-4
let url;
{
  url = new URL("https://api.openweathermap.org");

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
      // vi avbryter om svaret inte är 200-299
      if (!response.ok) throw `${response.status} ${response.statusText}`;
      return response.json();
    })
    .then((object) => {
      const prettyJSON = JSON.stringify(object, null, " ");
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
  xhr.responseType = "json";

  xhr.onload = function (event) {
    // vi avbryter om svaret inte är 200-299
    const isOk = 200 <= event.target.status && event.target.status <= 299;
    if (!isOk) throw `Status ${event.target.status} ${event.target.statusText}`;

    const object = event.target.response;

    const prettyJSON = JSON.stringify(object, null, " ");
    out.innerText = prettyJSON;
  };

  xhr.onerror = function (event) {
    console.log(event);
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
 ** Exercise 5 **
\****************/
{
  const titleH2 = document.getElementById("ex-5-title");
  const contentP = document.getElementById("ex-5-content");
  const authorP = document.getElementById("ex-5-author");
  const commentsDiv = document.getElementById("ex-5-comments");

  // sök efter användare med id === 1
  const userUrl = new URL("http://jsonplaceholder.typicode.com/users/1");

  // sök blogginlägg för användare med id === 1
  const postsUrl = new URL("http://jsonplaceholder.typicode.com/users/1/posts");

  // sök efter max 4 kommentarer relaterade till inlägg 3
  const commentsUrl = new URL(
    "http://jsonplaceholder.typicode.com/posts/3/comments"
  );
  commentsUrl.searchParams.set("_limit", 4);

  fetch(userUrl)
    .then((response) => {
      if (!response.ok) throw `${response.status} ${response.statusText}`;
      return response.json();
    })
    .then((user) => {
      authorP.textContent = user.name;
    })
    .catch((error) => console.log(error));

  fetch(postsUrl)
    .then((response) => {
      if (!response.ok) throw `${response.status} ${response.statusText}`;
      return response.json();
    })
    .then((posts) => {
      const post = posts[0]; // hämta första inlägget
      titleH2.textContent = post.title;
      contentP.textContent = post.body;
    })
    .catch((error) => console.log(error));

  fetch(commentsUrl)
    .then((response) => {
      if (!response.ok) throw `${response.status} ${response.statusText}`;
      return response.json();
    })
    .then((comments) => {
      // töm div på test kommentaren
      commentsDiv.innerHTML = "";

      for (let comment of comments) {
        commentsDiv.insertAdjacentHTML(
          "beforeend",
          /* html */ `
            <div class="comment">
              <h3>${comment.name}</h3>
              <p>${comment.body}</p>
            </div>
          `
        );
      }
    })
    .catch((error) => console.log(error));
}

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
  const nameP = document.getElementById("ex-6-name");
  const flavortextP = document.getElementById("ex-6-flavortext");

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
        nameP.textContent = pokemon.name;

        // Här fortsätter jag fetch kedjan genom att returnera en ny fetch
        return fetch(pokemon.species.url);
      })
      .then((response) => {
        if (!response.ok) throw `${response.status} ${response.statusText}`;
        return response.json();
      })
      .then((species) => {
        flavortextP.textContent = species.flavor_text_entries[0].flavor_text;
      })
      // om något går fel i något av de fetch vi gör så kommer felet att samlas här
      .catch((error) => console.log(error));
  }
}
