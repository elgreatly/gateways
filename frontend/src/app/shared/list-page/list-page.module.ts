import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import { ButtonModule } from '../button/button.module';
import { ItemBarModule } from '../item-bar/item-bar.module';
import { ListPageComponent } from './list-page.component';

@NgModule({
  declarations: [
    ListPageComponent
  ],
  imports: [
    CommonModule,
    ItemBarModule,
    ButtonModule,
    NgxPaginationModule
  ],
  providers: [],
  exports: [
    ListPageComponent
  ]
})
export class ListPageModule { }
