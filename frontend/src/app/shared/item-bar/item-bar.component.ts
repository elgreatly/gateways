import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemModel } from './models/item.model';

@Component({
  selector: 'app-item-bar',
  templateUrl: './item-bar.component.html',
  styleUrls: ['./item-bar.component.scss']
})
export class ItemBarComponent {
  @Output() editItemEvent = new EventEmitter<number>();
  
  @Input() item: ItemModel = new ItemModel({});
  @Input() isEditable: boolean = false;

  editItem(id: any) {
    this.editItemEvent.emit(id);
  }
}