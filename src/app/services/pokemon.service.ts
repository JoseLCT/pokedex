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
            is_hidden
          }
          especificaciones: pokemon_v2_pokemonspecy {
            capture_rate
            dexnumbers: pokemon_v2_pokemondexnumbers {
              pokedex_number
              pokedex: pokemon_v2_pokedex {
                version_group: pokemon_v2_pokedexversiongroups {
                  group: pokemon_v2_versiongroup {
                    name
                  }
                }
                region: pokemon_v2_region {
                  name
                }
              }
            }
            specyName: pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: 9}}) {
              genus
            }
            descripciones: pokemon_v2_pokemonspeciesflavortexts(where: {version_id: {_eq: 7}}) {
              descripcion: flavor_text
            }
            evolutionChain: pokemon_v2_evolutionchain {
              id
              species: pokemon_v2_pokemonspecies {
                name
                evolutions: pokemon_v2_pokemonevolutions {
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
                  itemId: evolution_item_id
                  specieId: evolved_species_id
                }
                capture_rate
                growth_rate: pokemon_v2_growthrate {
                  name
                }
                eggGroups:pokemon_v2_pokemonegggroups {
                  eggGroup:pokemon_v2_egggroup {
                    name
                  }
                }
              }
            }
            gender_rate
            hatch_counter
            generation_id
          }
          stats: pokemon_v2_pokemonstats {
            base_stat
            stat: pokemon_v2_stat {
              name
            }
            effort
          }
          base_experience
        }
      }
    `;
  }

  getById(id: number) {
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
          habilidades: pokemon_v2_pokemonabilities {
            habilidad: pokemon_v2_ability {
              name
            }
            is_hidden
          }
          pokemon_v2_pokemonspecy {
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
          }
          stats: pokemon_v2_pokemonstats {
            base_stat
            stat: pokemon_v2_stat {
              name
            }
          }
        }
      } 
    `;
  }

  getTypes() {
    return gql`
      query samplePokeAPIquery {
        tipos: pokemon_v2_pokemontype(distinct_on: type_id) {
          tipo: pokemon_v2_type {
            name
          }
        }
      }    
    `;
  }

  oficialByIdaux(id: number) {
    return gql`
      query samplePokeAPIquery {
        pokemon: pokemon_v2_pokemon(where: {id: {_eq: ${id}}}) {
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
            is_hidden
          }
          pokemon_v2_pokemonspecy {
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
          }
          pokemon_v2_pokemonstats {
            base_stat
            pokemon_v2_stat {
              name
            }
          }
        }
      }
    `;
  }

  getByIdAux(id: number) {
    return gql`
      query samplePokeAPIquery {
        pokemon: pokemon_v2_pokemon(where: {id: {_eq: ${id}}}) {
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
            specyName: pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: 9}}) {
              genus
            }
            descripciones: pokemon_v2_pokemonspeciesflavortexts(where: {version_id: {_eq: 7}}) {
              descripcion: flavor_text
            }
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

  getByIds(id: number) {
    return gql`
      query samplePokeAPIquery {
        pokemon: pokemon_v2_pokemon(where: {id: {_eq: ${id}}}) {
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
            is_hidden
          }
          especificaciones: pokemon_v2_pokemonspecy {
            capture_rate
            dexnumbers: pokemon_v2_pokemondexnumbers {
              pokedex_number
              pokedex: pokemon_v2_pokedex {
                version_group: pokemon_v2_pokedexversiongroups {
                  group: pokemon_v2_versiongroup {
                    name
                  }
                }
                region: pokemon_v2_region {
                  name
                }
              }
            }
            specyName: pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: 9}}) {
              genus
            }
            descripciones: pokemon_v2_pokemonspeciesflavortexts(where: {version_id: {_eq: 7}}) {
              descripcion: flavor_text
            }
            evolutionChain: pokemon_v2_evolutionchain {
              id
              species: pokemon_v2_pokemonspecies {
                name
                evolutions: pokemon_v2_pokemonevolutions {
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
                  itemId: evolution_item_id
                  specieId: evolved_species_id
                }
                capture_rate
                growth_rate: pokemon_v2_growthrate {
                  name
                }
                eggGroups:pokemon_v2_pokemonegggroups {
                  eggGroup:pokemon_v2_egggroup {
                    name
                  }
                }
              }
            }
            gender_rate
            hatch_counter
          }
          stats: pokemon_v2_pokemonstats {
            base_stat
            stat: pokemon_v2_stat {
              name
            }
            effort
          }
          base_experience
        }
      }
  `;
  }
}


