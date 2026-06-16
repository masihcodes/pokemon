import { create } from 'zustand';
import { PokemonCardType, PokemonStoreType } from './types';



export const usePokemonStore = create<PokemonStoreType>()(() => ({
  target: {
    id: 0,
    name: "",
    details: {
      types: [],
      stats: []
    }
  },
  pokemonModalStatus: false,
  signInModalStatus: false,
  signUpModalStatus: false
}));



export function setTarget(input: PokemonCardType) {
  usePokemonStore.setState({
    target: {
      id: input.id,
      name: input.name,
      details: input.details,
    }
  });
}

export function resetTarget() {
  usePokemonStore.setState({
    target: {
      id: 0,
      name: "",
      details: {
        types: [],
        stats: []
      }
    }
  });
}

export function setPokemonModalStatus(input: boolean) {
  usePokemonStore.setState({ pokemonModalStatus: input });
}

export function setSignInModalStatus(input: boolean) {
  usePokemonStore.setState({ signInModalStatus: input });
}

export function setSignUpModalStatus(input: boolean) {
  usePokemonStore.setState({ signUpModalStatus: input });
}