import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  pokemonList: any[] = [];

  constructor(
    private apollo: Apollo,
    private pokemonService: PokemonService
  ) {
    this.ionViewDidEnter();
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    // pokemos service is a graphql service
    this.apollo.watchQuery({
      query: this.pokemonService.getAll()
    }).valueChanges.subscribe((result: any) => {
      this.pokemonList = result.data.pokemon;
      console.log(this.pokemonList);
    });
  }
}
