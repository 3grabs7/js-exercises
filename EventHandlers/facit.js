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
  const output = prompt(exTwoInputOneElement.value);
  exTwoInputTwoElement.value = output;
});

exTwoButtonTwoElement.addEventListener('click', () => {
  exTwoInputOneElement.value = '';
  exTwoInputTwoElement.value = '';
});
