/****************\
 ** Exercise robin **
\****************/

/****************\
 ** Exercise 1 **
\****************/
let url;
{
  url = new URL("https://pokeapi.co/api/v2/pokemon?offset=40&limit=20");

  url.searchParams.set("offset", "40");
  url.searchParams.set("limit", "20");

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

/****************\
 ** Exercise 4 **
\****************/
{
  let ball = document.querySelector("#ex-4 .ball");
  ball.addEventListener("click", moveSequence, { once: true });

  function moveSequence(e) {
    ball.classList.add("not-clickable");
    ball.style.animation = "move-down 1s 1";

    setTimeout(function () {
      ball.style.animation = "move-right 1s 1";

      setTimeout(function () {
        ball.style.animation = "move-up 1s 1";

        setTimeout(function () {
          ball.style.animation = "move-left 1s 1";

          setTimeout(function () {
            ball.classList.remove("not-clickable");
            ball.addEventListener("click", moveSequence, { once: true });
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }
}

/****************\
 ** Exercise 5 **
\****************/
{
  let ball = document.querySelector("#ex-5 .ball");
  ball.addEventListener("click", moveSequence, { once: true });

  async function moveSequence(e) {
    ball.classList.add("not-clickable");

    ball.style.animation = "move-down 1s 1";
    await delay(1000);

    ball.style.animation = "move-right 1s 1";
    await delay(1000);

    ball.style.animation = "move-up 1s 1";
    await delay(1000);

    ball.style.animation = "move-left 1s 1";
    await delay(1000);

    ball.classList.remove("not-clickable");
    ball.style.animation = "";
    ball.addEventListener("click", moveSequence, { once: true });
  }

  // en fin 'util' funktion
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

/****************\
 ** Exercise 6 **
\****************/
{
  let balls = document.querySelectorAll("#ex-6 .ball");
  for (let ball of balls) {
    ball.addEventListener("click", moveSequence);
  }

  async function moveSequence(e) {
    for (let ball of balls) {
      ball.classList.add("not-clickable");
      ball.removeEventListener("click", moveSequence);
    }

    let promises = [
      moveBallAndWait(balls[0], 1),
      moveBallAndWait(balls[1], 3),
      moveBallAndWait(balls[2], 1.5),
      moveBallAndWait(balls[3], 2),
    ];

    await Promise.all(promises);

    for (let ball of balls) {
      ball.classList.remove("not-clickable");
      ball.style.animation = "";
      ball.addEventListener("click", moveSequence);
    }
  }

  async function moveBallAndWait(ball, s) {
    ball.style.animation = `lat-move ${s}s 1`;
    await defer(s * 1000);
  }

  function defer(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }
}
