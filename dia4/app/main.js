import './style.css'
const table = document.querySelector('[data-js="table"]');
const form = document.querySelector('[data-js="cars-form"]');
const error = document.querySelector('[data-js="error"]');
const url = `http://localhost:3333/cars`;

const specialElements = {
  image: createImageTd,
  color: createColorTd
}

async function fetchApi(options) {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

function noCarsFound() {
  const p = document.createElement('p');
  p.textContent = 'Nenhum carro encontrado';
  table.appendChild(p);
}

function createImageTd(value) {
  const td = document.createElement('td');
  const img = document.createElement('img');
  img.src = value;
  img.style.width = "100px"
  img.style.height = "100px"
  td.appendChild(img);
  return td;
}

function createColorTd(value) {
  const td = document.createElement('td');
  const div = document.createElement('div');
  div.style.background = value;
  div.style.width = '100px'
  div.style.height = '100px';
  td.appendChild(div);
  return td
}

function createTextTd(value) {
  const td = document.createElement('td');
  td.textContent = value;
  return td
}

async function deleteFunction(car) {
  await fetchApi({method: 'DELETE', body: JSON.stringify({plate: car.plate}), headers: {
    'Content-Type': 'application/json'
  }});
  renderCars();
}

function createDeleteButton(car) {
  const td = document.createElement('td');
  const button = document.createElement('button');
  button.textContent = 'Deletar';
  button.addEventListener('click', () => deleteFunction(car))
  td.appendChild(button)
  return td;
}

function renderCar(car) {
  const tr = document.createElement('tr');
  tr.append(createDeleteButton(car));

  Object.entries(car).forEach(([key, value]) => {
    if (specialElements[key]) {
      tr.appendChild(specialElements[key](value));
    } else {
      tr.appendChild(createTextTd(value))
    }
  });

  table.appendChild(tr)
}

async function renderCars() {
  table.innerHTML = '';
  error.innerHTML = '';

  const cars = await fetchApi({method: 'GET'});

  const hasCars = cars.length;

  hasCars ? cars.forEach(renderCar) : noCarsFound();
}

function createError(message) {
  error.textContent = message;
}

async function formEvent(event) {
  event.preventDefault();
  const [image, brandModel, year, plate, color] = Array.from(event.target.elements);

  const requestBody = {
    image: image.value,
    brandModel: brandModel.value,
    year: Number(year.value),
    plate: plate.value,
    color: color.value
  };

  const options = {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const response = await fetchApi(options)

  response.error ? createError(response.message) : renderCars();
}

form.addEventListener('submit', formEvent);
renderCars();
