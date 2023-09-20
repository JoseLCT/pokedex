import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Apollo } from 'apollo-angular';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-modal-filter',
  templateUrl: './modal-filter.component.html',
  styleUrls: ['./modal-filter.component.scss'],
})
export class ModalFilterComponent implements OnInit {

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

  selectedGenerationFilters: number[] = [];
  selectedSortFilters: string[] = [];

  selectedTypeFilters: string[] = [];
  selectedWeaknessFilters: string[] = [];
  selectedHeightFilters: string[] = [];
  selectedWeightFilters: string[] = [];

  @ViewChild('modalGeneration') modalGeneration?: IonModal;
  @ViewChild('modalSort') modalSort?: IonModal;
  @ViewChild('modalGeneral') modalGeneral?: IonModal;

  constructor(
    private apollo: Apollo,
    private pokemonService: PokemonService
  ) { }

  ngOnInit() { }

  openModal(type: string) {
    switch (type) {
      case 'generation':
        this.modalGeneration?.present();
        break;
      case 'sort':
        this.modalSort?.present();
        break;
        case 'general':
          this.openModalGeneral();
          break;
    }
  }

  clickGeneration(id: number) {
    if (this.selectedGenerationFilters.includes(id)) {
      this.selectedGenerationFilters = this.selectedGenerationFilters.filter((generationId) => generationId !== id);
    } else {
      this.selectedGenerationFilters.push(id);
    }
  }

  clickSort(id: string) {
    if (this.selectedSortFilters.includes(id)) {
      this.selectedSortFilters = this.selectedSortFilters.filter((sortId) => sortId !== id);
    } else {
      this.selectedSortFilters.push(id);
    }
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

  openModalGeneral() {
    if (this.typeList) {
      this.modalGeneral?.present();
      return;
    }
    this.apollo.watchQuery({
      query: this.pokemonService.getTypes()
    }).valueChanges.subscribe((result: any) => {
      this.typeList = result.data.tipos;
      this.modalGeneral?.present();
    });
  }
}