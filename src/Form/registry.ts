class Registry {
    private mapping = {};

    public get(item_name: string): any {
        item_name = item_name.toUpperCase();
        const item_value = this.mapping[item_name];
        if (item_value === null || item_value === undefined) {
            throw new Error(`No item registered for: ${item_name}`);
        }
        return item_value;
    }
    public set(item_name: string, item_value: any) {
        item_name = item_name.toUpperCase();
        this.mapping[item_name] = item_value;
        return this.mapping[item_name];
    }
    public isSet(item_name: string): boolean {
        return !!this.mapping[item_name];
    }
    public getKeys(): string[] {
        return Object.keys(this.mapping);
    }
}

export const widgetRegistry = new Registry();
export const registerWidget = widgetRegistry.set.bind(widgetRegistry);
