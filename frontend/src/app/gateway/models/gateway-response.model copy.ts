import { GatewayModel } from "./gateway.model";

export class GatewayResponseModel {
    data!: GatewayModel;

    public constructor(init?: Partial<GatewayResponseModel>) {
        Object.assign(this, init);
    }
}
