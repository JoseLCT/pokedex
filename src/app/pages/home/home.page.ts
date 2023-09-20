import { Component, OnInit, ViewChild } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ModalFilterComponent } from 'src/app/components/modal-filter/modal-filter.component';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  pokemonList: any[] = [];
  @ViewChild(ModalFilterComponent) modalFilter?: ModalFilterComponent;

  constructor(
    private apollo: Apollo,
    private pokemonService: PokemonService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.apollo.watchQuery({
      query: this.pokemonService.getAll()
    }).valueChanges.subscribe((result: any) => {
      this.pokemonList = result.data.pokemon;
    });
  }

  openModal(type: string) {
    this.modalFilter?.openModal(type);
  }
}