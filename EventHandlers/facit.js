// Exercise 1
const exOneInputElement = document.querySelector('#ex1-input');
const exOneButtonElement = document.querySelector('#ex1-button');

exOneButtonElement.addEventListener('click', () => {
  alert(exOneInputElement.value);
});

// Exercise 2
const exTwoInputOneElement = document.querySelector('#ex2-input1');
const exTwoInputTwoElement = document.querySelector('#ex2-input2');
const exTwoButtonOneElement = document.querySelector('#ex2-button1');
const exTwoButtonTwoElement = document.querySelector('#ex2-button2');

exTwoButtonOneElement.addEventListener('click', () => {
  if (inputIsValidated(exTwoInputOneElement.value)) {
    const output = prompt(exTwoInputOneElement.value);
    exTwoInputTwoElement.value = output;
    return;
  }
  alert('That was not a valid question.');
});

exTwoButtonTwoElement.addEventListener('click', () => {
  exTwoInputOneElement.value = '';
  exTwoInputTwoElement.value = '';
});

function inputIsValidated(input) {
  return input.match(/^[^?]*[?]$/);
}

// Exercise 3
