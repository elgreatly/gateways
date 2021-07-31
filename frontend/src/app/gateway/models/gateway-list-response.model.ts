import { GatewayModel } from "./gateway.model";

export class GatewayListResponseModel {
    data!: {
        count: number;
        gateways: GatewayModel[];
    };

    public constructor(init?: Partial<GatewayListResponseModel>) {
        Object.assign(this, init);
    }
}
