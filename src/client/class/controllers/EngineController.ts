import currencyController from './CurrencyController';
import inventoryController from './InventoryController';
import lootController from './LootController';
import mapController from './MapController';
import playerController from './PlayerController';
import type Map from '../map/Map';
import { CURRENCY_CHANCES, type CURRENCY_TYPES_HELPER } from '../../config/currency';

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

		if (currentMap !== null) {
			this.isMapRunning = true;
			const duration = currentMap.getMinDuration() * this.calculateDurationModifier(currentMap) * 1000;

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

	private calculateDurationModifier(map: Map): number {
		const player = playerController.getPlayer();

		// @TODO compare stats

		const attack = player.calculateDamage();
		const defense = player.calculateDefense();
		const speed = player.calculateSpeed();

		const mapAttackDifficutly = map.getAttackDifficulty();
		const mapDefenseDifficutly = map.getDefenseDifficulty();
		const mapSpeedDifficutly = map.getSpeedDifficulty();

		const attackModifier = mapAttackDifficutly / attack;
		const defenseModifier = mapDefenseDifficutly / defense;
		const speedModifier = mapSpeedDifficutly / speed;

		return Math.max(attackModifier, 1) + Math.max(defenseModifier, 1) + Math.max(speedModifier, 1);
	}
}

const engineController = new EngineController();
export default engineController;
