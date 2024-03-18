const ButtonType = {
  Pink: '#fdcae1',
  Blue: '#84b6f4',
  Yellow: '#fdfd96',
  Red: '#ff6961',
  Green: '#77dd77'
}

if (esDispositivoMovil())
  document.getElementsByClassName('container')[0].classList.add('mobile')

const buttons = document.getElementsByTagName('a')
const marked = []
const solution = []
let action = true;
let counter;


(function randomizeSolution() {
  let aux = [
    ButtonType.Pink,
    ButtonType.Blue,
    ButtonType.Yellow,
    ButtonType.Red,
    ButtonType.Green
  ]

  for (let i = 5; i > 0; i--) {
    let n = getRandomInt(i)
    solution.push(aux[n])
    aux.splice(n, 1)
  }
})();

refreshCorrect(false);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function esDispositivoMovil() {
  return window.innerWidth <= 768; // Puedes ajustar este valor según tus necesidades
}

function mark(i) {
  if (!buttons[i].classList.contains('marked')) {
    if (!action && marked.length >= 1)
      return;
    buttons[i].classList.add('marked')
    marked.push(i)
    if (marked.length >= 2)
      swap()
  }
  else {
    buttons[i].classList.remove('marked')
    marked.splice(marked.findIndex((element) => element == i), 1)
  }
}

function swap() {
  buttons[marked[0]].classList.remove('marked')
  buttons[marked[1]].classList.remove('marked')

  let aux = buttons[marked[0]].style.getPropertyValue('--clr')
  buttons[marked[0]].style.setProperty('--clr', buttons[marked[1]].style.getPropertyValue('--clr'))
  buttons[marked[1]].style.setProperty('--clr', aux)

  aux = buttons[marked[0]].querySelector('span').textContent
  buttons[marked[0]].querySelector('span').textContent = buttons[marked[1]].querySelector('span').textContent
  buttons[marked[1]].querySelector('span').textContent = aux

  marked.splice(0, 2)

  refreshCorrect();
}

function refreshCorrect(b = true) {
  counter = 0
  for (let i = 0; i < 5; i++) {
    if (buttons[i].style.getPropertyValue('--clr') == solution[i])
      counter++
  }

  showChange(counter - parseInt(document.querySelector('#correctNumber').textContent), b)
  document.querySelector('#correctNumber').textContent = counter;
}


function showChange(n, b) {
  if (!b)
    return;

  let element
  let banner = document.getElementById('banner')

  if (counter >= 5) {
    document.getElementById('win').classList.add('win')
    action = false;
    banner.style.setProperty('--clr', '#fdfd96')
    banner.style.setProperty('--fill', 'forwards')
    banner.style.setProperty('--dir', 'normal')
    banner.classList.add('colorChange')
    return;
  }

  if (n > 0) {
    element = document.querySelector('#up');
    banner.style.setProperty('--clr', '#77dd77')
  }
  else if (n == 0) {
    element = document.querySelector('#same');
    banner.style.setProperty('--clr', 'grey')
  }
  else {
    element = document.querySelector('#down');
    banner.style.setProperty('--clr', '#ff6961')
  }

  element.classList.add('show')
  banner.classList.add('colorChange')
  action = false
  setTimeout(() => {
    element.classList.remove('show')
    banner.classList.remove('colorChange')
    action = true
  }, 2000);
}