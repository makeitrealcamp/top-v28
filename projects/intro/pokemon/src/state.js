export function getState() {
  const state = {
    pokemons: [
      {
        name: 'ivysaur',
        health: {
          initial: 60,
          current: 60,
          bar: 'green',
        },
        avatar:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
        types: [
          {
            name: 'grass',
          },
          {
            name: 'poison',
          },
        ],
        moves: [
          {
            name: 'swords-dance',
          },
          {
            name: 'bind',
          },
          {
            name: 'vine-whip',
          },
          {
            name: 'headbutt',
          },
        ],
      },
      {
        name: 'charmeleon',
        health: {
          initial: 58,
          current: 58,
          bar: 'green',
        },
        avatar:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png',
        types: [
          {
            name: 'fire',
          },
        ],
        moves: [
          {
            name: 'mega-punch',
          },
          {
            name: 'fire-punch',
          },
          {
            name: 'thunder-punch',
          },
          {
            name: 'scratch',
          },
        ],
      },
    ],
    position: 0,
  };
  return state;
}
