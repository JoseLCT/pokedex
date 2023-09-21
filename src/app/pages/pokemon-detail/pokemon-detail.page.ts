import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
})
export class PokemonDetailPage implements OnInit {

  id: number = 0;
  pokemon: any = {};
  pokemonLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private pokemonService: PokemonService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loadData();
  }

  loadData() {
    this.id = this.route.snapshot.params['id'];
    this.apollo.watchQuery({
      query: this.pokemonService.getByIdAux(this.id)
    }).valueChanges.subscribe((result: any) => {
      this.pokemon = result.data.pokemon[0];
      this.pokemonLoaded = true;
    });
  }
}
