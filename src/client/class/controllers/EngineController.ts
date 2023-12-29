import currencyController from './CurrencyController';
import inventoryController from './InventoryController';
import lootController from './LootController';
import mapController from './MapController';
import playerController from './PlayerController';
import type Map from '../map/Map';
import { CURRENCY_CHANCES, type CURRENCY_TYPES_HELPER } from '../../config/currency';
import type MapZone from '../map/MapZone';
import type Player from '../player/Player';
import Calculator from './Calculator';

class EngineController {
	private initialized = false;
	private isMapRunning = false;

	public init(): void {
		if (this.initialized) {
			return;
		}

		for (let i = 0; i < 5; i += 1) {
			const testItem2 = lootController.generateItem(mapController.getCurrentMap() ?? undefined);
			currencyController.useCurrency('transmute', testItem2);
			inventoryController.addItem(testItem2);
		}

		this.initialized = true;
	}

	public startMap(map: typeof Map): void {
		if (this.isMapRunning) {
			return;
		}

		mapController.startMap(map);

		const currentMap = mapController.getCurrentMap();
		const currentZone = mapController.getCurrentZone();

		if (currentMap !== null && currentZone !== null) {
			this.isMapRunning = true;
			const duration =
				currentMap.getMinDuration() * this.calculateDurationModifier(currentMap, currentZone) * 1000;
			console.log('duration', duration);

			currentMap.endTimestamp = Date.now() + duration;
		}
	}

	public finishMap(): void {
		this.awardLoot(mapController.getCurrentMap());
		mapController.startMap(null);

		this.isMapRunning = false;
	}

	public awardLoot(map: Map | null): void {
		// Awarding items
		const amount = Math.floor(Math.random() * 3) + 1;
		for (let i = 0; i < amount; i += 1) {
			const item = lootController.generateItem(map ?? undefined);
			inventoryController.addItem(item);
		}

		// Awarding currency
		const currencyTypes = currencyController.getCurrencies().map(cur => cur.getType());
		const chances = CURRENCY_CHANCES;

		currencyTypes.forEach(type => {
			const dice = Math.random();
			if (dice < chances[type]) {
				this.awardCurrency(type);
			}
		});
	}

	private awardCurrency(currencyType: CURRENCY_TYPES_HELPER): void {
		const amount = Math.floor(Math.random() * 3) + 1;

		currencyController.addCurrency(currencyType, amount);
	}

	private calculateDurationModifier(map: Map, zone: MapZone): number {
		const player = playerController.getPlayer();

		const statModifier = this.compareStats(player, zone);

		return Math.max(statModifier, 1);
	}

	private compareStats(player: Player, zone: MapZone): number {
		let modifier: number = 0;

		// Calculate damage
		let totalDamage = 0;

		// Physical damage
		totalDamage += this.calculatePhysicalDamage(player, zone);

		// Damage modifier
		modifier += Calculator.calculateModifier(totalDamage, zone.getDamageThreshold());

		console.log(modifier);

		return modifier;
	}

	private calculatePhysicalDamage(player: Player, zone: MapZone): number {
		const playerPhysicalDamage = player.physicalDamage;
		const zonePhysicalDamageReduction = Calculator.calculatePhysicalDamageReduction(zone);

		return playerPhysicalDamage * (1 - zonePhysicalDamageReduction);
	}
}

const engineController = new EngineController();
export default engineController;
