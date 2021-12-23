const isFacitActive = localStorage.isFacitActive === 'true';

const script = document.createElement('script');
script.id = 'script';

if (isFacitActive) {
  script.setAttribute('src', './facit.js');

  const toggleElement = document.querySelector('#facitToggle');
  toggleElement.classList.toggle('on');
} else {
  script.setAttribute('src', './main.js');
}
document.querySelector('body').append(script);

function toggleFacit() {
  localStorage.isFacitActive = !isFacitActive;
  console.log(localStorage.isFacitActive);
  window.location.reload();
}
