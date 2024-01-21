import { type ITEM_RARITY_TYPE_VALUE } from '../../config/item';
import AffixUser from '../AffixUser';
import type Enemy from '../enemy/Enemy';
import type Item from '../items/Item';

export default abstract class Map extends AffixUser {
	private readonly name: string;
	private readonly image: string;
	private readonly lootTable: Array<typeof Item>;
	private readonly enemyTypes: Array<typeof Enemy>;

	protected damageThreshold: number = 1;
	protected defenseThreshold: number = 1;
	protected speedThreshold: number = 1;
	protected minDuration: number = 5; // in seconds

	public endTimestamp: number = 0;

	constructor(
		name: string,
		image: string,
		rarity: ITEM_RARITY_TYPE_VALUE,
		mapLevel: number,
		lootTable: Array<typeof Item>,
		enemyTypes: Array<typeof Enemy>
	) {
		super(rarity, mapLevel);

		this.name = name;
		this.image = image;
		this.lootTable = lootTable;
		this.enemyTypes = enemyTypes;
	}

	public getName(): string {
		return this.name;
	}

	public getImage(): URL {
		return new URL(`../../assets/maps/${this.image}`, import.meta.url);
	}

	public getLevel(): number {
		return this.getItemLevel();
	}

	public getLootTable(): Array<typeof Item> {
		return this.lootTable;
	}

	public getDamageThreshold(): number {
		return this.damageThreshold;
	}

	public getDefenseThreshold(): number {
		return this.defenseThreshold;
	}

	public getSpeedThreshold(): number {
		return this.speedThreshold;
	}

	public getMinDuration(): number {
		return this.minDuration;
	}

	public override getDescription(): string {
		return `${super.getDescription()}
			<br>Attack difficulty: ${this.damageThreshold}
			<br>Defense difficulty: ${this.defenseThreshold}
			<br>Speed difficulty: ${this.speedThreshold}
			<br>Minimum duration: ${this.minDuration}
		`;
	}

	public getEnemyTypes(): Array<typeof Enemy> {
		return this.enemyTypes;
	}
}
