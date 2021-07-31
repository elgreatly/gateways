export class ItemModel {
    id?: number;
    name!: string;
    // devices: DeviceModel[];

    public constructor(init?: Partial<ItemModel>) {
        Object.assign(this, init);
    }
}
