import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GatewayListResponseModel } from '../models/gateway-list-response.model';
import { GatewayModel } from '../models/gateway.model';
import { GatewayResponseModel } from '../models/gateway-response.model copy';

@Injectable()
export class GatewayService {
  
  baseURL: string = '/api/v1/gateways';

  constructor(
    private http: HttpClient,
  ) { }

  getGateways(limit: number = 10, offset: number = 0): Observable<GatewayListResponseModel> {
    return this.http.get<GatewayListResponseModel>(`${this.baseURL}?limit=${limit}&offset=${offset}`);
  }

  getGateway(id: number): Observable<GatewayResponseModel> {
    return this.http.get<GatewayResponseModel>(`${this.baseURL}/${id}`);
  }

  addGateway(gateway: GatewayModel): Observable<any> {
    return this.http.post(this.baseURL, gateway);
  }

  editGatewayDevices(id: number, gateway: GatewayModel): Observable<any> {
    return this.http.put(`${this.baseURL}/${id}`, gateway);
  }
}
