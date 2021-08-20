const form = document.querySelector("[data-js='cars-form']")
const table = document.querySelector("[data-js='table']")

const inputs = document.querySelectorAll('[data-js="cars-form"]>input');

const elementTypes = {
  image: createImage,
  text: createText,
  color: createColor
}

function createImage(value) {
  const img = document.createElement('img');
  img.src = value;
  img.style.width = "100px"
  img.style.height = "100px"
  return img
}

function createText(value) {
  const td = document.createElement('td');
  td.textContent = value
  return td;
}

function createColor(value) {
  const div = document.createElement('div');
  div.style.backgroundColor = value;
  div.style.height = "100px"
  div.style.width = "100px"
  return div
}

function clearAndFocus(inputs) {
  Array.from(inputs).forEach(input => {
    input.value = ''
  })

  inputs[0].focus();
}

function getInputValues(inputs) {
  return Array.from(inputs).map(input => {
    const isImage = input.value.startsWith('https://')
    const inputData = {
      value: input.value,
      name: input.id,
      type: input.type
    }

    if (isImage) {
      return {
        ...inputData,
        type: 'image'
      }
    }

    return inputData;
  })
}

function submitEvent(event) {
  event.preventDefault();
  const data = getInputValues(inputs);
  const tr = document.createElement('tr');

  data.forEach(item => {
    const td = elementTypes[item.type](item.value);
    tr.appendChild(td);
  })

  table.appendChild(tr)
  clearAndFocus(inputs);
}

form.addEventListener('submit', submitEvent)
