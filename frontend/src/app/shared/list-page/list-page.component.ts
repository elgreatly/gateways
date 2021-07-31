import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemModel } from '../item-bar/models/item.model';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent {
  @Output() addItemEvent = new EventEmitter<void>();
  @Output() editItemEvent = new EventEmitter<number>();
  @Output() pageChangedEvent = new EventEmitter<number>();
  
  @Input() title: string = '';
  @Input() buttonText: string = '';
  @Input() items: ItemModel[] = [];
  @Input() isEditable: boolean = false;
  @Input() totalCount: number = 0;

  currentPage: number = 1;

  addItem() {
    this.addItemEvent.emit();
  }

  editItem(id: number) {
    this.editItemEvent.emit(id);
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.pageChangedEvent.emit(page);
  }
}