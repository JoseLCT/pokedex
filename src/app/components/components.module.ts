import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ModalFilterComponent } from './modal-filter/modal-filter.component';

@NgModule({
    declarations: [
        ModalFilterComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        ModalFilterComponent
    ]
})
export class ComponentsModule { }
