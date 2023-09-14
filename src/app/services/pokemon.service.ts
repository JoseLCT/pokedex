import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }

  getAll() {
    return gql`
      query get {
        pokemon: pokemon_v2_pokemon {
          id
          name
          tipos: pokemon_v2_pokemontypes {
            detalleTipo: pokemon_v2_type {
              name
            }
          }
          weight
          height
          pokemon_v2_pokemonabilities {
            pokemon_v2_ability {
              name
            }
          }
          pokemon_v2_pokemonspecy {
            capture_rate
            pokemon_v2_growthrate {
              name
            }
          }
        }
      }
    `;
  }
}
