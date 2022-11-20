import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
   pokemons: [],
   myPokemons: [],
};

const pokemonSlice = createSlice({
   name: 'pokemon',
   initialState,
   reducers: {
      setPokemon(state, action) {
        state.pokemons = action.payload.pokemon;
      },
      setMyPokemon(state, action) {
        state.myPokemons = action.payload.pokemon;
      },
   },
});
export const { setPokemon, setMyPokemon } = pokemonSlice.actions;
const pokemonReducer = pokemonSlice.reducer;

export default pokemonReducer;