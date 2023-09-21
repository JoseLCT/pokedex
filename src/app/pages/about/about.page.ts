import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { PokemonService } from 'src/app/services/pokemon.service';
import { calculateDefensesAgainstAllTypes } from 'src/app/pokemon-stats/stats';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  id: number = 0;
  pokemon: any = {};
  description: string = '';
  type: string = '';
  species: string = '';
  height: number = 0;
  weight: number = 0;
  abilities: string[] = [];
  weaknessList: string[] = [];
  evYield: string = '';
  catchRate: number = 0;
  baseExp: number = 0;
  growthRate: string = '';
  
  malePercentage: number = 0;
  femalePercentage: number = 0;
  eggGroup: string[] = [];
  eggCycle: string = '';
  
  dexNumbers: Array<{ number: number, names: string[] }> = [];
  loaded: boolean = false;

  constructor(
    private route: Router,
    private apollo: Apollo,
    private pokemonService: PokemonService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loadData();
  }

  loadData() {
    this.setData();
    const idStr = this.route.url.split('/')[2];
    this.id = parseInt(idStr);
    this.apollo.watchQuery({
      query: this.pokemonService.getByIds(this.id)
    }).valueChanges.subscribe((result: any) => {
      this.pokemon = result.data.pokemon[0];
      this.description = this.pokemon.especificaciones.descripciones[0].descripcion;
      this.description = this.description.replace('\n', ' ');
      this.description = this.description.replace('\f', ' ');
      this.type = this.pokemon.tipos[0].detalleTipo.name;
      this.height = this.pokemon.height;
      this.weight = this.pokemon.weight;
      const allList = calculateDefensesAgainstAllTypes(this.pokemon.tipos);
      for (const type in allList) {
        if (allList[type] > 1) {
          this.weaknessList.push(type);
        }
      }
      this.species = this.pokemon.especificaciones.specyName[0].genus;
      const evYieldList = this.pokemon.stats;
      for (const stat of evYieldList) {
        if (stat.effort > 0) {
          this.evYield += stat.effort + ' ' + stat.stat.name;
        }
      }
      this.catchRate = this.pokemon.especificaciones.capture_rate;
      this.baseExp = this.pokemon.base_experience;
      this.growthRate = this.pokemon.especificaciones.evolutionChain.species[0].growth_rate.name;
      const genderRate = this.pokemon.especificaciones.gender_rate;
      if (genderRate === 1) {
        this.malePercentage = 87.5;
        this.femalePercentage = 12.5;
      }
      if (genderRate === 0) {
        this.malePercentage = 100;
        this.femalePercentage = 0;
      }
      if (genderRate === 8) {
        this.malePercentage = 0;
        this.femalePercentage = 100;
      }
      this.eggGroup = this.pokemon.especificaciones.evolutionChain.species[0].eggGroups.map((eggGroup: any) => {
        return eggGroup.eggGroup.name;
      });
      let eggCycleValue = this.pokemon.especificaciones.hatch_counter;
      this.eggCycle = eggCycleValue + ' (' + (eggCycleValue * 244.2) + ' - ' + (eggCycleValue * 257) + ' steps)';
      const dexNumbers = this.pokemon.especificaciones.dexnumbers;
      for (const dexNumber of dexNumbers) {
        let colors = dexNumber.pokedex.version_group;
        let names: string[] = [];
        for (const color of colors) {
          names.push(color.group.name);
        }
        this.dexNumbers.push({
          number: dexNumber.pokedex_number,
          names: names
        });
      }
      this.loaded = true;
    });
  }

  setData() {
    this.id = 0;
    this.pokemon = {};
    this.description = '';
    this.type = '';
    this.species = '';
    this.height = 0;
    this.weight = 0;
    this.abilities = [];
    this.weaknessList = [];
    this.loaded = false;
  }
}
