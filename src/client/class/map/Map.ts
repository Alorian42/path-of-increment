import { type ITEM_RARITY_TYPE_VALUE } from '../../config/item';
import AffixUser from '../AffixUser';
import type Item from '../items/Item';

export default abstract class Map extends AffixUser {
	private readonly name: string;
	private readonly image: string;
	private readonly lootTable: Array<typeof Item>;

	protected attackDifficulty: number = 1;
	protected defenseDifficulty: number = 1;
	protected speedDifficulty: number = 1;
	protected minDuration: number = 5; // in seconds

	public endTimestamp: number = 0;

	constructor(
		name: string,
		image: string,
		rarity: ITEM_RARITY_TYPE_VALUE,
		mapLevel: number,
		lootTable: Array<typeof Item>
	) {
		super(rarity, mapLevel);

		this.name = name;
		this.image = image;
		this.lootTable = lootTable;
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

	public getAttackDifficulty(): number {
		return this.attackDifficulty;
	}

	public getDefenseDifficulty(): number {
		return this.defenseDifficulty;
	}

	public getSpeedDifficulty(): number {
		return this.speedDifficulty;
	}

	public getMinDuration(): number {
		return this.minDuration;
	}

	public override getDescription(): string {
		return `${super.getDescription()}
			<br>Attack difficulty: ${this.attackDifficulty}
			<br>Defense difficulty: ${this.defenseDifficulty}
			<br>Speed difficulty: ${this.speedDifficulty}
			<br>Minimum duration: ${this.minDuration}
		`;
	}
}
