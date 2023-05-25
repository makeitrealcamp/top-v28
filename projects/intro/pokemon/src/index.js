import { getState } from './state';
import { dialog, movesBox, pokemonBox, pokemonStatus } from './pokemon';
import { calculateBarColor, calculateStatus, getRandomNumber } from './utils';

import './main.scss';

let state = {};

function render() {
  const { pokemons = [], position = 0 } = state;
  const arena = document.getElementById('arena');
  const columns = arena.getElementsByClassName('column');

  pokemons.forEach(function (pokemon, index) {
    const container = columns[index];

    const pokemonBoxHTML = pokemonBox(pokemon);
    const pokemonStatusHTML = pokemonStatus(pokemon);

    if (index === 0) {
      container.innerHTML = pokemonStatusHTML + pokemonBoxHTML;
    } else {
      container.innerHTML = pokemonBoxHTML + pokemonStatusHTML;
    }
  });

  const indicator = document.getElementById('indicator');
  Array.from(indicator.getElementsByClassName('column')).forEach(function (
    column,
    index,
  ) {
    if (position === index) {
      column.innerHTML = '<div class="arrow"></div>';
    } else {
      column.innerHTML = '';
    }
  });

  const panel = document.getElementById('panel');
  const message = 'What attack do you want to use?';

  const dialogHTML = dialog(pokemons[position], message);
  const movesElement = movesBox(pokemons[position], turn);

  const [left, right] = panel.children;

  if (position === 0) {
    left.innerHTML = dialogHTML;
    right.replaceChildren(movesElement);
  } else {
    left.replaceChildren(movesElement);
    right.innerHTML = dialogHTML;
  }
}

function turn() {
  const { pokemons = [], position = 0 } = state;
  let attacked = (position + 1) % 2;
  const pokemon = pokemons[attacked];

  // Setup
  const arena = document.getElementById('arena');
  const container = arena.getElementsByClassName('column')[attacked];
  const [bar] = container.getElementsByClassName('bar');
  const [health] = container.getElementsByClassName('health');

  // Turn
  const { newHealth, newPercentage } = calculateStatus(
    pokemon.health.initial,
    pokemon.health.current,
    getRandomNumber(20),
  );
  const newBarColor = calculateBarColor(newPercentage);
  const previousBarColor = pokemon.health.bar;

  // Update UI
  bar.setAttribute('style', `width: ${newPercentage}%`);
  bar.classList.remove(previousBarColor);
  bar.classList.add(newBarColor);
  health.textContent = `${newHealth}/${pokemon.health.initial}`;

  // Set State
  pokemon.health.current = newHealth;
  pokemon.health.bar = newBarColor;

  if (newHealth > 0) {
    state.position = (state.position + 1) % 2;
    render();
  } else {
    document.querySelector('#panel .message').textContent = 'Wins';
    document.querySelector('#panel .moves').innerHTML = '';
  }
}

window.addEventListener('DOMContentLoaded', function () {
  state = getState();
  render();
});
