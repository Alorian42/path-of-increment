import type Item from './items/Item';

export default abstract class Map {
	private readonly name: string;
	private readonly image: string;
	private readonly mapLevel: number = 1;
	private readonly lootTable: Array<typeof Item>;

	protected attackDifficulty: number = 1;
	protected defenseDifficulty: number = 1;
	protected duration: number = 60; // in seconds

	public endTimestamp: number = 0;

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

	public getAttackDifficulty(): number {
		return this.attackDifficulty;
	}

	public getDefenseDifficulty(): number {
		return this.defenseDifficulty;
	}

	public getDuration(): number {
		return this.duration;
	}
}
