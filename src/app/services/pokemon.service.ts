import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }

  getAll() {
    return gql`
      query samplePokeAPIquery {
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
          especificaciones: pokemon_v2_pokemonspecy {
            capture_rate
            pokemon_v2_evolutionchain {
              id
              pokemon_v2_pokemonspecies {
                name
                pokemon_v2_pokemonevolutions {
                  pokemon_v2_move {
                    name
                  }
                  time_of_day
                  turn_upside_down
                  min_affection
                  min_beauty
                  min_happiness
                  min_level
                  needs_overworld_rain
                  held_item_id
                  pokemonV2ItemByHeldItemId {
                    id
                    name
                  }
                  pokemon_v2_item {
                    name
                    id
                  }
                  evolution_trigger_id
                  pokemon_v2_evolutiontrigger {
                    name
                  }
                }
              }
            }
            generacion: pokemon_v2_generation {
              id
            }
          }
        }
      }
    `;
  }
}
