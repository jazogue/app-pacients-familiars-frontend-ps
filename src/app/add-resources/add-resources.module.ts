import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddResourcesPageRoutingModule } from './add-resources-routing.module';

import { AddResourcesPage } from './add-resources.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddResourcesPageRoutingModule,
    IonicSelectableModule,
  ],
  declarations: [AddResourcesPage],
})
export class AddResourcesPageModule {}
