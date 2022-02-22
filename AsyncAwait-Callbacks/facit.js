/****************\
 ** Exercise 1 **
\****************/
(async function () {
  const url = new URL("http://localhost:5176");
  url.pathname = "api/image/1";

  const image = await fetch(url).then((res) => res.json());

  const imgElement = document.querySelector("#ex-1 img");
  const pElement = document.querySelector("#ex-1 p");

  imgElement.src = image.url;
  imgElement.width = image.metadata.width / 2;
  pElement.textContent = image.metadata.size;
})();

/****************\
 ** Exercise 2 **
\****************/
(async function () {
  //...
})();

/****************\
 ** Exercise 3 **
\****************/
(async function () {
  //...
})();

/****************\
 ** Exercise 4 **
\****************/
(async function () {
  //...
})();

/****************\
 ** Exercise 5 **
\****************/
(async function () {
  //...
})();
