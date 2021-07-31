import { GetGatewayResponse } from './get-gateway.response';

export class GetGatewaysListResponse {
    count: number;
    gateways: GetGatewayResponse[];

    constructor(data?: any) {
        Object.assign(this, data);
    }
}
