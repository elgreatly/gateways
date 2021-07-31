import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    RouterModule,
    BrowserModule
  ],
  providers: [],
  exports: [
    MenuComponent
  ]
})
export class MenuModule { }
