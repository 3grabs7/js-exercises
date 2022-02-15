document.addEventListener("click", (event) => {
  if (event.target.tagName.toLowerCase() !== "button") return;

  const alertDiv = event.target.closest("[data-action]");
  // vi kollar specifikt efter null för closest() returnerar ett HTMLElement eller null
  // DOM sökfunktioner returnerar oftast 'null' eller resultatet.
  // 'undefined' får man oftast istället när man råkat stava fel, och då vill jag att programmet ska kracha med en varning i konsollen.
  if (alertDiv === null) return;

  alertDiv.classList.add("hidden");
});
