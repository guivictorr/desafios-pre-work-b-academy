import './style.css'

const hideButton =  document.querySelector('[data-js="link"]')
const app = document.querySelector('[data-js="app"]')

app.innerHTML = `
  <h1>B. Academy</h1>
  <p>Boas vindas à semana de pré-work para o Bootcamp em React.js 😁</p>
`

hideButton.addEventListener('click', () => {
  app.classList.toggle('hide')
  hideButton.innerHTML = app.classList.contains('hide') ? 'Mostrar' : 'Esconder'
})
