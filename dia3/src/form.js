const input = document.querySelector('[data-js="nome"]');
const form = document.querySelector('[data-js="form"]');

// Exercício 1

function capitalize(word) {
  const lowerCaseWord = word.toLowerCase();
  const firstLetter = lowerCaseWord[0].toUpperCase();
  const wordWithoutFirstLetter = lowerCaseWord.slice(1);
  const capitalized = firstLetter + wordWithoutFirstLetter;

  return capitalized;
}

function checkExceptions(word) {
  const exceptions = ['de', 'da', 'do', 'dos'];
  return exceptions.includes(word) ? word : capitalize(word);
}

function inputEvent(event) {
  const name = event.target.value;
  const capitalizedWords = name.split(' ').map(checkExceptions);

  input.value = capitalizedWords.join(' ');
}

input.addEventListener('change', inputEvent)

// Exercício 2

function addOption(value) {
  selectElement.innerHTML += `<option value="${value}">${value}</option>`;
}

function createDiv(color) {
  const divElement = document.createElement('div');

  divElement.style.width = '100px';
  divElement.style.height = '100px';
  divElement.style.backgroundColor = color;

  colorsElement.appendChild(divElement)
}

function selectEvent(event) {
  const { selectedOptions } = event.target;
  colorsElement.innerHTML = '';

  for (const item of selectedOptions) {
    createDiv(item.value);
  }
}

const colors = ["red", "blue", "green", "tomato", "limegreen"];

const selectElement = document.createElement('select');
selectElement.setAttribute('multiple', true);

const colorsElement = document.createElement('div');
colors.forEach(addOption)

form.appendChild(selectElement);
form.appendChild(colorsElement)

selectElement.addEventListener('change', selectEvent);
