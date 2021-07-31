export class GetDeviceResponse {
    id: number;
    vendor: string;
    createdAt: Date;
    status: string;

    constructor(data?: any) {
        Object.assign(this, data);
    }
}
