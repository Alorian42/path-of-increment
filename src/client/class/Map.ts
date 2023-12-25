import type Item from './items/Item';

export default abstract class Map {
	private readonly name: string;
	private readonly image: string;
	private readonly mapLevel: number = 1;
	private readonly lootTable: Array<typeof Item>;

	constructor(name: string, image: string, mapLevel: number, lootTable: Array<typeof Item>) {
		this.name = name;
		this.image = image;
		this.mapLevel = mapLevel;
		this.lootTable = lootTable;
	}

	public getName(): string {
		return this.name;
	}

	public getImage(): URL {
		return new URL(`../assets/maps/${this.image}`, import.meta.url);
	}

	public getLevel(): number {
		return this.mapLevel;
	}

	public getLootTable(): Array<typeof Item> {
		return this.lootTable;
	}
}
