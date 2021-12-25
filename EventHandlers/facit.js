/****************\
 ** Exercise 1 **
\****************/
const exOneInputElement = document.querySelector('#ex1-input');
const exOneButtonElement = document.querySelector('#ex1-button');

exOneButtonElement.addEventListener('click', () => {
  alert(exOneInputElement.value);
});

/****************\
 ** Exercise 2 **
\****************/
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
  /*
    Regex säger att matcha endast tecken som inte är '?' från start och oändligt många gånger framåt.
    Sen matchar vi endast om sista tecknet är '?'
  */
  return input.match(/^[^?]*[?]$/);
}

/****************\
 ** Exercise 3 **
\****************/
const exThreeInputElement = document.querySelector('#ex3-input');
exThreeInputElement.addEventListener('keydown', (e) => {
  /*
    Regex säger att vi matchar endast 1 och noll 
    ELLER Backspace
    ELLER ord som börjar på Arrow följt av vilka tecken som helst
  */
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

/****************\
 ** Exercise 4 **
\****************/
const exFourInputOpOneElement = document.querySelector('#ex4-input1');
const exFourInputOpTwoElement = document.querySelector('#ex4-input2');
const exFourInputResultElement = document.querySelector('#ex4-input3');
const exFourButtonOperatorsCollection =
  document.querySelectorAll('.btn-operator');

[exFourInputOpOneElement, exFourInputOpTwoElement].forEach((op) => {
  op.addEventListener('keydown', (e) => {
    if (
      /*
        Regex säger samma som övning innan men vi matchar 0 till 9 istället
      */
      !e.key.match(/[0-9]|Backspace|Arrow\w+/) ||
      (op.value.length === 0 && e.key === '0')
    ) {
      e.preventDefault();
    }
  });
  op.addEventListener('keyup', () => {
    /*
      Regex säger vi matchar 0 från start och oändligt många i följd
    */
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

/****************\
 ** Exercise 5 **
\****************/
exFiveButtonPlusElement = document.querySelector('#ex5-button1');
exFiveButtonMinusElement = document.querySelector('#ex5-button2');
exFiveInputWrapperElement = document.querySelector('#ex5-input-wrapper');

exFiveButtonPlusElement.addEventListener('click', addInput);
exFiveButtonMinusElement.addEventListener('click', removeInput);

// Update all inputs when one change
getInputCollection().forEach((ele) => {
  ele.addEventListener('input', (event) => {
    getCollectionOfInputs().forEach((nestEle) => {
      nestEle.value = event.target.value;
    });
  });
});

function addInput() {
  const currentInputsCount = getInputCollection().length + 1;

  const wrapper = document.createElement('div');

  const label = document.createElement('label');
  label.innerHTML = `Input ${currentInputsCount}`;
  label.setAttribute('for', `ex5-input${currentInputsCount}`);

  const input = document.createElement('input');
  input.type = 'text';
  input.id = `ex5-input${currentInputsCount}`;
  input.addEventListener('input', (event) => {
    getInputCollection().forEach((nestEle) => {
      nestEle.value = event.target.value;
    });
  });

  wrapper.appendChild(input);
  wrapper.insertBefore(label, input);

  exFiveInputWrapperElement.appendChild(wrapper);
}

function removeInput() {
  if (getInputCollection().length <= 1) return;
  exFiveInputWrapperElement.removeChild(exFiveInputWrapperElement.lastChild);
}

function getInputCollection() {
  return document.querySelectorAll('input[id^="ex5-input"');
}

/****************\
 ** Exercise 6 **
\****************/
const exSixSelectElement = document.querySelector('#ex6-select');
const exSixBoxElement = document.querySelector('#ex6-box');
const exSixCheckboxElement = document.querySelector('#ex6-box-rot');

let interval;
let rotation = 0;

exSixSelectElement.addEventListener('change', (e) => {
  console.log('change osv');
  exSixBoxElement.style.backgroundColor = e.target.value;
});

exSixCheckboxElement.addEventListener('input', (e) => {
  if (!e.target.checked) {
    clearInterval(interval);
    return;
  }

  interval = setInterval(() => {
    rotation++;
    exSixBoxElement.style.transform = `rotate(${rotation}deg)`;
  }, 50);
});

/****************\
 ** Exercise 7 **
\****************/
const exSevenBoxOne = document.querySelector('#ex7-box1');
const exSevenBoxTwo = document.querySelector('#ex7-box2');
const exSevenBoxThree = document.querySelector('#ex7-box3');

// objekt som håller nuvarande färger på våra boxes
const colorTracker = {
  'ex7-box1': 'red',
  'ex7-box2': 'green',
  'ex7-box3': 'blue',
};

// vi sätter inline style så vi slipper leta i computed styles efter applicerat stylesheet
exSevenBoxOne.style.backgroundColor = colorTracker[exSevenBoxOne.id];
exSevenBoxTwo.style.backgroundColor = colorTracker[exSevenBoxTwo.id];
exSevenBoxThree.style.backgroundColor = colorTracker[exSevenBoxThree.id];

let draggedElement;

document.addEventListener('dragstart', function (event) {
  /*
      regex säger att vi vill matcha ex7-box följt av oändligt många siffror 
      och sista tecknet måste vara en siffra
      på detta sätt förhindrar vi vårt pattern att matcha på wrappern (ex7-box-wrapper)
    */
  if (event.target.id.match(/ex7-box[0-9]*$/)) {
    draggedElement = event.target;
  }
});

document.addEventListener('dragover', function (event) {
  event.preventDefault();
});

document.addEventListener('dragenter', function (event) {
  if (event.target.id.match(/ex7-box[0-9]*$/)) {
    draggedColor = window.getComputedStyle(draggedElement).backgroundColor;
    draggedElement.style.backgroundColor = window.getComputedStyle(
      event.target
    ).backgroundColor;
    event.target.style.backgroundColor = draggedColor;
  }
});

document.addEventListener('dragleave', function (event) {
  if (event.target.id.match(/ex7-box[0-9]*$/)) {
    event.target.style.backgroundColor = colorTracker[event.target.id];
    draggedElement.style.backgroundColor = colorTracker[draggedElement.id];
  }
});

document.addEventListener('drop', function (event) {
  if (event.target.id.match(/ex7-box[0-9]*$/)) {
    const tempColor = colorTracker[draggedElement.id];
    colorTracker[draggedElement.id] = colorTracker[event.target.id];
    colorTracker[event.target.id] = tempColor;
  }
});
