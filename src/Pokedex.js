import React from 'react';
import Pokemon from './Pokemon';
import Button from './Button';
import './pokedex.css';

class Pokedex extends React.Component {
  constructor() {
    super();
    // Estado inicial - crio um index para indicar posição e faço com que o estado do tipo do pokemon seja all para conseguir criar um botão e depois mudar através do chave type do objeto.
    this.state = {
      pokemonIndex: 0,
      filteredType: 'all',
    };
  }

//   a mudança do pokemon será seu tipo e index
  filterPokemons(filteredType) {
    this.setState({ filteredType, pokemonIndex: 0 });
  }

//   setar o estado através da adição do index dividido pelo número de pokemons da lista
  nextPokemon(numberOfPokemons) {
    this.setState(state => ({
      pokemonIndex: (state.pokemonIndex + 1) % numberOfPokemons,
    }));
  }

//   capturar os pokemons e filtrar os tipos de pokemon
  fetchFilteredPokemons() {
    const { pokemons } = this.props;
    const { filteredType } = this.state;

    return pokemons.filter(pokemon => {
      if (filteredType === 'all') return true;
      return pokemon.type === filteredType;
    });
  }

//   criar um array novo sem pokemons repetidos e adicionar cada tipo em um array através do reduce
  fetchPokemonTypes() {
    const { pokemons } = this.props;

    return [...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];
  }

  render() {
    const filteredPokemons = this.fetchFilteredPokemons();
    const pokemonTypes = this.fetchPokemonTypes();
    const pokemon = filteredPokemons[this.state.pokemonIndex];

    return (
      <div className="pokedex">
        <Pokemon pokemon={ pokemon } />
        <div className="pokedex-buttons-panel">
            {/* Botão All */}
          <Button
            onClick={() => this.filterPokemons('all')}
            className="filter-button"
          >
            All
          </Button>
        {/* Botão tipos- irá mapear cada tipo e cria um botão que irá representar os tipos */}
          {pokemonTypes.map(type => (
            <Button
              key={ type }
              onClick={() => this.filterPokemons(type)}
              className="filter-button"
            >
              { type }
            </Button>
          ))}
        </div>
        {/* Botão próximo pokemon */}
        <Button
          className="pokedex-button"
          onClick={() => this.nextPokemon(filteredPokemons.length)}
          disabled={ filteredPokemons.length <= 1 }
        >
          Próximo pokémon
        </Button>
      </div>
    );
  }
}

export default Pokedex;
