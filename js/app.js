const key = document.querySelectorAll('.number');
const operatorKey = document.querySelectorAll('.operator');
const bigDisplay = document.querySelector('.calculator__display--large');
const smallDisplay = document.querySelector('.calculator__display--small');
const equalKey = document.querySelector('.equal');
const backKey = document.querySelector('.back');
const clearKey = document.querySelector('.clear');

let num1 = '0';
let num2 = '0';
let operate = false;
let pressed = false;
let operator = '';
let operatorSymbol = '';
let invalid = false;

function start() {
   bigDisplay.insertAdjacentHTML('afterbegin', `<span class="start">0</span>`);
   const startNum = document.querySelector('.start');

   key.forEach((key) => {
      key.addEventListener('click', () => {
         if (startNum.style.opacity !== 0) {
            startNum.style.opacity = 0;
         }
         const value = key.innerHTML;
         if (pressed) {
            remove(bigDisplay);
            pressed = false;
         }

         if (invalid) {
            remove(bigDisplay);
            invalid = false;
         }

         if (operate) {
            num2 += value;
         } else {
            num1 += value;
         }

         changeDisplay(value);
      });
   });

   operatorKey.forEach((key) => {
      key.addEventListener('click', () => {
         if (num1 != '0' && num2 != '0') {
            calculateResult(true);
         }
         const value = key.dataset.operator;
         operate = true;
         pressed = true;
         operator = value;
      });
   });

   equalKey.addEventListener('click', () => calculateResult(false));

   backKey.addEventListener('click', () => backHandler(startNum));

   clearKey.addEventListener('click', () => {
      if (smallDisplay.childNodes.length == 1) {
         smallDisplay.removeChild(smallDisplay.lastChild);
      }
      remove(bigDisplay);
      num1 = '0';
      num2 = '0';
      startNum.style.opacity = 1;
   });
}

function changeDisplay(value) {
   bigDisplay.insertAdjacentHTML('beforeend', value);
}

function calculateResult(bool) {
   operate = bool;
   switch (operator) {
      case 'add':
         console.log(num1, num2);
         changeSmallDisplay(num1, num2);
         num1 = Number(num1) + Number(num2);
         reset();
         removeAndDisplay();
         break;
      case 'subtract':
         changeSmallDisplay(num1, num2);
         num1 = Number(num1) - Number(num2);
         reset();
         removeAndDisplay();
         break;
      case 'multiply':
         changeSmallDisplay(num1, num2);
         num1 = Number(num1) * Number(num2);
         reset();
         removeAndDisplay();
         break;
      case 'divide':
         changeSmallDisplay(num1, num2);
         num1 = +(Number(num1) / Number(num2)).toFixed(10);
         // console.log(num1);
         reset();
         removeAndDisplay();
         break;
   }
}

function reset() {
   num2 = '0';
}

function backHandler(startNum) {
   if (bigDisplay.childNodes.length > 1) {
      bigDisplay.removeChild(bigDisplay.lastChild);
      if (operate && num1.length >= 1 && num2.length >= 1) {
         num2 = num2.slice(0, -1);
      } else {
         num1 = num1.slice(0, -1);
      }

      if (num1.length < 1) {
         num1 = '0';
      }

      console.log(num1, num2);
      if (bigDisplay.childNodes.length < 2) {
         startNum.style.opacity = 1;
      }
   }
}

function remove(el) {
   while (el.childNodes.length > 1) {
      el.removeChild(el.lastChild);
   }
}

function removeAndDisplay() {
   remove(bigDisplay);
   num1 = num1.toString();
   if (num1 == 'NaN') {
      num1 = '0';
      invalid = true;
      bigDisplay.insertAdjacentHTML(
         'beforeend',
         "<p class='error'>Invalid Number</p>"
      );
   } else {
      for (let i = 0; i < num1.length; i++) {
         bigDisplay.insertAdjacentHTML('beforeend', num1[i]);
      }
   }
}

function changeSmallDisplay(num1, num2) {
   if (smallDisplay.childNodes.length == 1) {
      smallDisplay.removeChild(smallDisplay.lastChild);
   }
   if (!isNaN(Number(num1)) && !isNaN(Number(num2))) {
      if (operator == 'add') {
         operatorSymbol = '+';
      } else if (operator == 'subtract') {
         operatorSymbol = '-';
      } else if (operator == 'multiply') {
         operatorSymbol = '<ion-icon name="close-outline"></ion-icon>';
      } else if (operator == 'divide') {
         operatorSymbol = '/';
      }

      let small = `<div>${Number(
         num1
      )} <span class="calculator__display--operator">${operatorSymbol}</span> ${Number(
         num2
      )}</div>`;

      smallDisplay.insertAdjacentHTML('afterbegin', small);
   }
}

start();
