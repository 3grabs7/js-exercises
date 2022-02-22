/****************\
 ** Exercise 1 **
\****************/
(async function () {
  const url = new URL("http://localhost:5176");
  url.pathname = "api/image/1";

  // promise chaining för att vänta på både response och resultat i ett
  const image = await fetch(url).then((response) => response.json());

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
  const containerElement = document.querySelector("#ex-2");
  const url = new URL("http://localhost:5176");

  for (let id = 1; true; id++) {
    url.pathname = `api/image/${id}`;

    const response = await fetch(url);

    // leta efter 404 för att avbryta
    if (response.status === 404) break;

    const image = await response.json();

    containerElement.insertAdjacentHTML(
      "beforeend",
      /* html */ `<img src="${image.url}" width="100" height="100">`
    );
  }
})();

/****************\
 ** Exercise 3 **
\****************/
{
  const buttonElement = document.querySelector("#ex-3 button");
  buttonElement.onclick = async function () {
    const postUrl = new URL("http://localhost:5176");
    postUrl.pathname = "api/image";

    const newImageUrl = prompt("Klistra in en bild url");
    // sätt som query parameter
    postUrl.searchParams.set("url", newImageUrl);

    // sätt att vi gör en HTTP POST request
    const response = await fetch(postUrl, {
      method: "POST",
    });

    const image = await response.json();

    const imgElement = document.querySelector("#ex-3 img");
    const pElement = document.querySelector("#ex-3 p");

    imgElement.src = image.url;
    imgElement.width = image.metadata.width / 2;
    pElement.textContent = image.metadata.size;
  };
}

/****************\
 ** Exercise 4 **
\****************/
(async function () {
  const containerElement = document.querySelector("#ex-4");
  const pElement = document.querySelector("#ex-4 p");
  const url = new URL("http://localhost:5176");

  // starta klockan
  const start = Date.now();

  for (let id = 1; id <= 3; id++) {
    url.pathname = `api/image/${id}/throttle`;

    const response = await fetch(url);
    const image = await response.json();

    containerElement.insertAdjacentHTML(
      "afterbegin",
      /* html */ `<img src="${image.url}" width="100" height="100">`
    );
  }

  // stanna klockan
  const stop = Date.now();

  // räkna ut tiden det tog
  const ms = stop - start;
  pElement.textContent = `Det tog ${ms} ms för bilderna att ladda ner`;
})();

/****************\
 ** Exercise 5 **
\****************/
(async function () {
  const containerElement = document.querySelector("#ex-5");
  const pElement = document.querySelector("#ex-5 p");
  const url = new URL("http://localhost:5176");

  const start = Date.now();

  // skapa alla löften och lägg i en lista
  const promises = [];
  for (let id = 1; id <= 3; id++) {
    url.pathname = `api/image/${id}/throttle`;

    const promise = fetch(url).then((response) => response.json());
    promises.push(promise);
  }

  // invänta alla löften
  const images = await Promise.all(promises);

  // gå igenom alla resultat
  for (const image of images) {
    containerElement.insertAdjacentHTML(
      "afterbegin",
      /* html */ `<img src="${image.url}" width="100" height="100">`
    );
  }

  const stop = Date.now();

  const ms = stop - start;
  pElement.textContent = `Det tog ${ms} ms för bilderna att ladda ner`;
})();
