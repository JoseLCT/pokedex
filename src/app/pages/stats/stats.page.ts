import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { PokemonService } from 'src/app/services/pokemon.service';
import { calculateDefensesAgainstAllTypes } from 'src/app/pokemon-stats/stats';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {

  pokemon: any = {};
  type: string = '';

  stats: number[] = [];
  minStats: number[] = [];
  maxStats: number[] = [];
  total: number = 0;

  typeDefenses: Record<string, number> = {};


  constructor(
    private route: Router,
    private apollo: Apollo,
    private pokemonService: PokemonService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    const idStr = this.route.url.split('/')[2];
    const id = parseInt(idStr);
    this.apollo.watchQuery({
      query: this.pokemonService.getById(id)
    }).valueChanges.subscribe((result: any) => {
      this.pokemon = result.data.pokemon[0];
      this.type = this.pokemon.tipos[0].detalleTipo.name;
      this.pokemon.stats.forEach((stat: any) => {
        this.stats.push(stat.base_stat);
        if (stat.stat.name === 'hp') {
          this.minStats.push(this.getMinHp(stat.base_stat));
          this.maxStats.push(this.getMaxHp(stat.base_stat));
        } else {
          this.minStats.push(this.getMinStat(stat.base_stat));
          this.maxStats.push(this.getMaxStat(stat.base_stat));
        }
        this.total += stat.base_stat;
      });
      this.typeDefenses = calculateDefensesAgainstAllTypes(this.pokemon.tipos);
    });
  }

  getMinStat(baseStat: number) {
    return Math.floor(((baseStat * 2) + 5) * 0.9);
  }

  getMaxStat(baseStat: number) {
    return Math.floor(((baseStat * 2 + 31 + 63) + 5) * 1.1);
  }

  getMinHp(baseStat: number) {
    return Math.floor(((baseStat * 2) + 110));
  }

  getMaxHp(baseStat: number) {
    return Math.floor(((baseStat * 2 + 31 + 63) + 110));
  }
}
