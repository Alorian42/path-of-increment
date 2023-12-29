import StatUser from '../StatUser';
import type Map from './Map';
import MapStats, { type MAP_STATS_TYPE_HELPER } from './MapStats';

export default class MapZone extends StatUser {
	protected stats: Record<MAP_STATS_TYPE_HELPER, number> = MapStats.getDefaults();
	protected map: Map;

	constructor(map: Map) {
		super();

		this.map = map;
		this.map.equip(this);
	}

	public modifyStat(stat: MAP_STATS_TYPE_HELPER, value: number): void {
		this.stats[stat] += value;
	}

	public getStats(): Record<MAP_STATS_TYPE_HELPER, number> {
		return this.stats;
	}

	public getLevel(): number {
		return this.map.getLevel();
	}

	public getDamageThreshold(): number {
		return this.map.getDamageThreshold();
	}

	public getDefenseThreshold(): number {
		return this.map.getDefenseThreshold();
	}

	public getSpeedThreshold(): number {
		return this.map.getSpeedThreshold();
	}

	public get itemQuantity(): number {
		return (this.stats.itemQuantity + this.stats.additionalItemQuantity) * this.stats.multiplierItemQuantity;
	}

	public get itemRarity(): number {
		return (this.stats.itemRarity + this.stats.additionalItemRarity) * this.stats.multiplierItemRarity;
	}

	public get mapPackSize(): number {
		return (this.stats.mapPackSize + this.stats.additionalMapPackSize) * this.stats.multiplierMapPackSize;
	}

	public get mobArmor(): number {
		return (this.stats.mobArmor + this.stats.additionalMobArmor) * this.stats.multiplierMobArmor;
	}

	public getDescription(): string {
		return `
		<br>Zone Level: ${this.map.getItemLevel()}
		<br>Item Quantity: ${this.itemQuantity}
		<br>Item Rarity: ${this.itemRarity}
		<br>Map Pack Size: ${this.mapPackSize}
		<br>${this.map.getDescription()}
		`;
	}
}
