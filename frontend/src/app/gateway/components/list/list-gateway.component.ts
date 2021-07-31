import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemModel } from 'src/app/shared/item-bar/models/item.model';
import { GatewayModel } from '../../models/gateway.model';
import { GatewayService } from '../../services/gateway.service';

@Component({
  selector: 'app-list-gateway',
  templateUrl: './list-gateway.component.html',
  styleUrls: ['./list-gateway.component.scss']
})
export class ListGatewayComponent {
  gateways: GatewayModel[] = [];
  items: ItemModel[] = [];
  totalCount: number = 0; 

  constructor (
    private gatewayService: GatewayService,
    private router: Router
  ) {
    this.getGateways();
  }

  addGateway() {
    this.router.navigate(['/gateways/add']);
  }

  editGateway(id: number) {
    this.router.navigate([`/gateways/edit/${id}`]); 
  }

  pageChanged(page: number) {
    const limit = 10;
    const offset = (page - 1) * limit;
    this.getGateways(limit, offset);
  }

  private getGateways(limit: number = 10, offset: number = 0) {
    this.gatewayService.getGateways(limit, offset).subscribe(response => {
      this.gateways = response.data.gateways;
      this.totalCount = response.data.count;
      this.items = this.gateways.map(gateway => {
        return new ItemModel({
          id: gateway.id,
          name: gateway.name
        })
      });
    });
  }
}
