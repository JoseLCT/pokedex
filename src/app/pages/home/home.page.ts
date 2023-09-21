import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RangeCustomEvent } from '@ionic/angular';
import { Apollo } from 'apollo-angular';
import { ModalFilterComponent } from 'src/app/components/modal-filter/modal-filter.component';
import { calculateDefensesAgainstAllTypes } from 'src/app/pokemon-stats/stats';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  pokemonList: any[] = [];
  pokemonListFiltered: any[] = [];
  //@ViewChild(ModalFilterComponent) modalFilter?: ModalFilterComponent;

  isApplied: boolean = false;
  generationList: any[] = [
    { integer: 1, roman: 'I' },
    { integer: 2, roman: 'II' },
    { integer: 3, roman: 'III' },
    { integer: 4, roman: 'IV' },
    { integer: 5, roman: 'V' },
    { integer: 6, roman: 'VI' },
    { integer: 7, roman: 'VII' },
    { integer: 8, roman: 'VIII' },
  ];
  typeList?: any[];
  heightList: string[] = [
    "short",
    "medium",
    "tall"
  ];
  weightList: string[] = [
    "light",
    "normal",
    "heavy"
  ];

  minMax: number[] = [0, 1000];

  selectedGenerationFilters: number[] = [];
  selectedSortFilters: string[] = [];

  selectedTypeFilters: string[] = [];
  selectedWeaknessFilters: string[] = [];
  selectedHeightFilters: string[] = [];
  selectedWeightFilters: string[] = [];

  onFilterChange(event: any) {
    this.pokemonList = event;
    console.log(this.pokemonList);
  }

  constructor(
    private apollo: Apollo,
    private pokemonService: PokemonService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  search(event: any) {
    const value = event.target.value;
    this.pokemonListFiltered = this.pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(value.toLowerCase()));
  }

  ionViewDidEnter() {
    this.apollo.watchQuery({
      query: this.pokemonService.getAll()
    }).valueChanges.subscribe((result: any) => {
      this.pokemonListFiltered = result.data.pokemon;
      this.pokemonList = result.data.pokemon;
    });
  }

  clickGeneration(id: number) {
    if (this.selectedGenerationFilters.includes(id)) {
      this.selectedGenerationFilters = this.selectedGenerationFilters.filter((generationId) => generationId !== id);
    } else {
      this.selectedGenerationFilters.push(id);
    }
    this.apply();
  }

  clickSort(id: string) {
    if (this.selectedSortFilters.includes(id)) {
      this.selectedSortFilters = this.selectedSortFilters.filter((sortId) => sortId !== id);
    } else {
      this.selectedSortFilters.push(id);
    }
    this.apply();
  }

  clickType(id: string) {
    if (this.selectedTypeFilters.includes(id)) {
      this.selectedTypeFilters = this.selectedTypeFilters.filter((type) => type !== id);
    } else {
      this.selectedTypeFilters.push(id);
    }
  }

  clickWeakness(id: string) {
    if (this.selectedWeaknessFilters.includes(id)) {
      this.selectedWeaknessFilters = this.selectedWeaknessFilters.filter((weakness) => weakness !== id);
    } else {
      this.selectedWeaknessFilters.push(id);
    }
  }

  clickHeight(id: string) {
    if (this.selectedHeightFilters.includes(id)) {
      this.selectedHeightFilters = this.selectedHeightFilters.filter((height) => height !== id);
    } else {
      this.selectedHeightFilters.push(id);
    }
  }

  clickWeight(id: string) {
    if (this.selectedWeightFilters.includes(id)) {
      this.selectedWeightFilters = this.selectedWeightFilters.filter((weight) => weight !== id);
    } else {
      this.selectedWeightFilters.push(id);
    }
  }

  // openModal(type: string) {
  //   this.modalFilter?.openModal(type);
  // }

  onClickPokemon(id: number) {
    this.router.navigate(['/pokemon-detail', id]);
  }

  openModalGeneral() {
    if (this.typeList) {
      return;
    }
    this.apollo.watchQuery({
      query: this.pokemonService.getTypes()
    }).valueChanges.subscribe((result: any) => {
      this.typeList = result.data.tipos;
    });
  }

  apply() {
    console.log(this.pokemonListFiltered);
    this.isApplied = true;
    this.pokemonListFiltered = this.pokemonList
      .filter(pokemon => {
        if (this.selectedGenerationFilters.length > 0) {
          return this.selectedGenerationFilters.includes(pokemon.especificaciones.generation_id);
        }
        return true;
      })
      .filter(pokemon => {
        if (this.selectedTypeFilters.length > 0) {
          let typeList = pokemon.tipos.filter((type: any) => {
            return this.selectedTypeFilters.includes(type.detalleTipo.name);
          });
          if (typeList.length > 0) {
            return true;
          }
        }
        return false;
      })
      .filter(pokemon => {
        if (this.selectedWeaknessFilters.length > 0) {
          const allList = calculateDefensesAgainstAllTypes(pokemon.tipos);
          for (const type in allList) {
            if (allList[type] > 1) {
              if (this.selectedWeaknessFilters.includes(type)) {
                return false;
              }
            }
          }
        }
        return true;
      })
      .filter(pokemon => {
        if (this.selectedHeightFilters.length > 0) {
          return this.selectedHeightFilters.some(height => pokemon.height === height);
        }
        return true;
      })
      .filter(pokemon => {
        if (this.selectedWeightFilters.length > 0) {
          return this.selectedWeightFilters.some(weight => pokemon.weight === weight);
        }
        return true;
      }).filter(pokemon => {
        if (this.minMax.length > 0) {
          return pokemon.id >= this.minMax[0] && pokemon.id <= this.minMax[1];
        }
        return true;
      });
    if (this.selectedSortFilters.length > 0) {
      const sort = this.selectedSortFilters[0];
      if (sort === 'smallest-first') {
        this.pokemonListFiltered.sort((a: any, b: any) => {
          return a.id - b.id;
        })
      }
      if (sort === 'highest-first') {
        this.pokemonListFiltered.sort((a: any, b: any) => {
          return b.id - a.id;
        })
      }
      if (sort === 'a-z') {
        this.pokemonListFiltered.sort((a: any, b: any) => {
          return a.name.localeCompare(b.name);
        })
      }
      if (sort === 'z-a') {
        this.pokemonListFiltered.sort((a: any, b: any) => {
          return b.name.localeCompare(a.name);
        })
      }
    }
  }

  onIonChange(event: any) {
    const range = document.querySelector('ion-range') as any;
    this.minMax = [range.value.lower, range.value.upper];
    console.log(this.minMax);
  }
}