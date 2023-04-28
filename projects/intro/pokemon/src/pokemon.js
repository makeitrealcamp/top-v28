function pokemonBox(pokemon = {}) {
  const { avatar = '' } = pokemon;
  return `
    <div class="pokemon">
      <img src="${avatar}" />
    </div>
  `;
}

function pokemonStatus(pokemon = {}) {
  const {
    name,
    health: { current = 0, initial = 1 },
    types = [],
  } = pokemon;

  const { newPercentage } = calculateStatus(initial, current, 0);
  const newBarColor = calculateBarColor(newPercentage);

  return `
  <div class="status">
    <div class="info">
      <p class="name">${name}</p>
    </div>
    <ul class="types">
      ${types
        .map(function (item) {
          const { name: typeName } = item;
          return `<li class="button ${typeName}">${typeName}</li>`;
        })
        .join('')}
    </ul>
    <div class="meter">
      <span class="bar ${newBarColor}" style="width: ${newPercentage}%"></span>
    </div>
    <div class="health">${current}/${initial}</div>
  </div>
  `;
}

function dialog(pokemon = {}, message) {
  const { name = '' } = pokemon;

  return `
    <div class="dialog">
      <p>
        <span class="name">${name}</span>,
        <span class="message">${message}</span>
      </p>
    </div>
  `;
}

function movesBox(pokemon = {}, callback) {
  const { moves = [] } = pokemon;

  const movesContainer = document.createElement('div');
  movesContainer.className = 'moves';

  moves.forEach(function (move) {
    const { name = '' } = move;

    const button = document.createElement('button');
    button.className = 'button black';
    button.textContent = name;
    button.addEventListener('click', function () {
      callback();
    });

    movesContainer.appendChild(button);
  });

  return movesContainer;
}
