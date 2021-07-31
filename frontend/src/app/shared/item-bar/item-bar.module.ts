import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItemBarComponent } from './item-bar.component';

@NgModule({
  declarations: [
    ItemBarComponent
  ],
  imports: [CommonModule],
  providers: [],
  exports: [
    ItemBarComponent
  ]
})
export class ItemBarModule { }
