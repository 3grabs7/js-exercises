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
const exThreeInputElement = document.querySelector('#ex3-input');
exThreeInputElement.addEventListener('keydown', (e) => {
  if (!e.key.match(/[01]|Backspace|Arrow\w+/)) {
    e.preventDefault();
  }
});
exThreeInputElement.addEventListener('keyup', () => {
  if (exThreeInputElement.value.length === 5) {
    alert('Vi är färdiga där');
    exThreeInputElement.setAttribute('disabled', true);
  }
});

// Exercise 4
const exFourInputOpOneElement = document.querySelector('#ex4-input1');
const exFourInputOpTwoElement = document.querySelector('#ex4-input2');
const exFourInputResultElement = document.querySelector('#ex4-input3');
const exFourButtonOperatorsCollection =
  document.querySelectorAll('.btn-operator');

[exFourInputOpOneElement, exFourInputOpTwoElement].forEach((op) => {
  op.addEventListener('keydown', (e) => {
    console.log(e.key);
    if (
      !e.key.match(/[0-9]|Backspace|Arrow\w+/) ||
      (op.value.length === 0 && e.key === '0')
    ) {
      e.preventDefault();
    }
  });
  op.addEventListener('keyup', () => {
    op.value = op.value.replace(/^[0]*/g, '');
  });
});

exFourButtonOperatorsCollection.forEach((btnOperator) => {
  btnOperator.addEventListener('mouseenter', (e) => {
    exFourInputResultElement.value = calculator[e.target.getAttribute('op')]();
  });
  btnOperator.addEventListener('mouseleave', () => {
    exFourInputResultElement.value = '';
  });
});

const calculator = {
  '+': () =>
    parseInt(exFourInputOpOneElement.value) +
    parseInt(exFourInputOpTwoElement.value),
  '-': () =>
    parseInt(exFourInputOpOneElement.value) -
    parseInt(exFourInputOpTwoElement.value),
  '*': () =>
    parseInt(exFourInputOpOneElement.value) *
    parseInt(exFourInputOpTwoElement.value),
  '/': () =>
    parseInt(exFourInputOpOneElement.value) /
    parseInt(exFourInputOpTwoElement.value),
};
