import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemonDetailPage } from './pokemon-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PokemonDetailPage,
    children: [
      {
        path: 'about',
        loadChildren: () => import('../../pages/about/about.module').then(m => m.AboutPageModule)
      },
      {
        path: 'stats',
        loadChildren: () => import('../../pages/stats/stats.module').then(m => m.StatsPageModule)
      },
      {
        path: 'evolution',
        loadChildren: () => import('../../pages/evolution/evolution.module').then(m => m.EvolutionPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonDetailPageRoutingModule { }
