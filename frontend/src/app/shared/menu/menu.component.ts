import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  items = [
    {
      id: 'gateways',
      name: 'Gateways',
      icon: 'icon-rss'
    },
    {
      id: 'devices',
      name: 'Devices',
      icon: 'icon-mobile'
    },
  ]
}
