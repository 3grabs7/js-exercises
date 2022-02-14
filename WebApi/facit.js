/****************\
 ** Exercise 1 **
\****************/
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

  document.querySelector("#ex-1-out").innerText = url;
}

/****************\
 ** Exercise 2 **
\****************/
{
  let out = document.querySelector("#ex-2-out");
  let xhr = new XMLHttpRequest();

  xhr.open("GET", url);
  xhr.responseType = "json";

  xhr.onload = function (event) {
    console.log(
      `Weather request status: ${event.target.status} ${event.target.statusText}`
    );

    if (event.target.status === 200) {
      // Begäran lyckades
      let objekt = event.target.response;
      out.innerText = JSON.stringify(objekt, null, " ");
    }
  };

  xhr.onerror = function (e) {
    console.log(url.origin + " could not be reached");
  };

  xhr.send();
}

/****************\
 ** Exercise 3 **
\****************/
// utan async/await
{
  let out = document.querySelector("#ex-3-out");

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw `${response.status} ${response.statusText}`;
      }
      return response.json();
    })
    .then((object) => {
      out.innerText = JSON.stringify(object, null, " ");
    })
    .catch((error) => console.log(error));
}

// med async/await
(async function () {
  let out = document.querySelector("#ex-3-out");

  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw `${response.status} ${response.statusText}`;
    }

    let object = await response.json();
    out.innerText = JSON.stringify(object, null, " ");
  } catch (error) {
    console.log(error);
  }
})();
