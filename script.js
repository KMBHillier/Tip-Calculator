// Get DOM elements
const billInput = document.getElementById('bill-input');
const customTipInput = document.getElementById('custom-tip-input');
const peopleInput = document.getElementById('people-input');
const tipButtons = document.querySelectorAll('.tip-button');
const tipAmountEl = document.getElementById('tip-amount');
const totalAmountEl = document.getElementById('total-amount');
const resetButton = document.getElementById('reset-button');

// Initialize variables
let billAmount = 0;
let tipPercentage = 12.5;
let customTipPercentage = 0;
let numberOfPeople = 1;

// Functions
function updateTipButtons() {
  tipButtons.forEach(button => {
    button.classList.remove('active');
    if (button.innerText === `${tipPercentage}%`) {
      button.classList.add('active');
    }
  });
}

function updateCustomTipInput() {
  if (tipPercentage === customTipPercentage) {
    customTipInput.value = tipPercentage;
  } else {
    customTipInput.value = '';
  }
}

function calculateTip() {
  const tipAmount = (billAmount * tipPercentage) / 100;
  const tipAmountPerPerson = tipAmount / numberOfPeople;
  const totalAmount = billAmount + tipAmount;
  const totalAmountPerPerson = totalAmount / numberOfPeople;

  tipAmountEl.innerText = `$${tipAmountPerPerson.toFixed(2)}`;
  totalAmountEl.innerText = `$${totalAmountPerPerson.toFixed(2)}`;
}

function resetCalculator() {
  billAmount = 0;
  tipPercentage = 0;
  customTipPercentage = 0;
  numberOfPeople = 1;
  billInput.value = '';
  tipButtons[2].click();
  peopleInput.value = 1;
  tipAmountEl.innerText = '$0.00';
  totalAmountEl.innerText = '$0.00';
}

// Event listeners
billInput.addEventListener('input', e => {
  billAmount = parseFloat(e.target.value);
  calculateTip();
});

customTipInput.addEventListener('input', e => {
  customTipPercentage = parseInt(e.target.value);
  if (customTipPercentage) {
    tipPercentage = customTipPercentage;
    updateTipButtons();
    calculateTip();
  }
});

tipButtons.forEach(button => {
  button.addEventListener('click', () => {
    tipPercentage = parseInt(button.innerText);
    updateTipButtons();
    updateCustomTipInput();
    calculateTip();
  });
});

peopleInput.addEventListener('input', e => {
  numberOfPeople = parseInt(e.target.value);
  if (!numberOfPeople || numberOfPeople < 1) {
    numberOfPeople = 1;
    e.target.value = numberOfPeople;
  }
  calculateTip();
});

resetButton.addEventListener('click', () => {
  resetCalculator();
});
