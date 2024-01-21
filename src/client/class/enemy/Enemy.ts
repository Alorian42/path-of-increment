import { type ITEM_RARITY_TYPE_VALUE } from '../../config/item';
import StatUser from '../StatUser';
import type Item from '../items/Item';
import EnemyStats, { type ENEMY_STATS_TYPE_HELPER } from './EnemyStats';

export default abstract class Enemy extends StatUser {
	protected stats = EnemyStats.getDefaults();

	constructor(
		private readonly name: string,
		private readonly image: string,
		private readonly level: number,
		private readonly rarity: ITEM_RARITY_TYPE_VALUE,
		private readonly lootTable: Array<typeof Item>
	) {
		super();
	}

	public modifyStat(stat: ENEMY_STATS_TYPE_HELPER, value: number): void {
		this.stats[stat] += value;
	}

	public getStats(): Record<ENEMY_STATS_TYPE_HELPER, number> {
		return this.stats;
	}

	public getName(): string {
		return this.name;
	}

	public getImage(): URL {
		return new URL(`../../assets/enemies/${this.image}`, import.meta.url);
	}

	public getLevel(): number {
		return this.level;
	}

	public getRarity(): ITEM_RARITY_TYPE_VALUE {
		return this.rarity;
	}

	public getLootTable(): Array<typeof Item> {
		return this.lootTable;
	}

	public get armor(): number {
		return (this.stats.armor + this.stats.additionalArmor) * this.stats.multiplierArmor;
	}

	public get life(): number {
		return (this.stats.life + this.stats.additionalLife) * this.stats.multiplierLife;
	}

	public get damage(): number {
		return (this.stats.damage + this.stats.additionalDamage) * this.stats.multiplierDamage;
	}

	public getDescription(): string {
		return `[${this.level}] ${this.name} (A: ${this.armor}, L: ${this.life}, D: ${this.damage}) - ${this.rarity}`;
	}
}
