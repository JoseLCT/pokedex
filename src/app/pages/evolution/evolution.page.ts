import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-evolution',
  templateUrl: './evolution.page.html',
  styleUrls: ['./evolution.page.scss'],
})
export class EvolutionPage implements OnInit {

  type: string = '';
  pokemon: any = {};
  evolutions: any[] = [];

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
      query: this.pokemonService.getByIds(id)
    }).valueChanges.subscribe((result: any) => {
      this.pokemon = result.data.pokemon[0];
      this.evolutions.push(this.pokemon);
      this.type = this.pokemon.tipos[0].detalleTipo.name;
      const evolutionsListAux = this.pokemon.especificaciones.evolutionChain.species;
      for (let i = 1; i < evolutionsListAux.length; i++) {
        if (i % 2 === 0 && i !== 0) {
          this.evolutions.push(evolutionsListAux[i - 1]);
        }
        this.evolutions.push(evolutionsListAux[i]);
      }
    });
  }
}
