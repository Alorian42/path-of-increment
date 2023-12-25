import currencyController from './CurrencyController';
import inventoryController from './InventoryController';
import lootController from './LootController';
import mapController from './MapController';
import playerController from './PlayerController';
import type Map from '../Map';

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

		mapController.setCurrentMap(map);

		const currentMap = mapController.getCurrentMap();

		if (currentMap !== null) {
			this.isMapRunning = true;
			currentMap.endTimestamp =
				Date.now() + currentMap.getDuration() * this.calculateDurationModifier(currentMap) * 100;
		}
	}

	public finishMap(): void {
		this.awardLoot(mapController.getCurrentMap());
		mapController.setCurrentMap(null);

		this.isMapRunning = false;
	}

	public awardLoot(map: Map | null): void {
		const amount = Math.floor(Math.random() * 3) + 1;
		for (let i = 0; i < amount; i += 1) {
			const item = lootController.generateItem(map ?? undefined);
			inventoryController.addItem(item);
		}
	}

	private calculateDurationModifier(map: Map): number {
		const player = playerController.getPlayer();
		const attack = player.calculateDamage();
		const defense = player.calculateDefense();
		const mapAttackDifficutly = map.getAttackDifficulty();
		const mapDefenseDifficutly = map.getDefenseDifficulty();

		const attackModifier = mapAttackDifficutly / attack;
		const defenseModifier = mapDefenseDifficutly / defense;

		console.log('Attack modifier', attackModifier);
		console.log('Defense modifier', defenseModifier);

		return attackModifier + defenseModifier;
	}
}

const engineController = new EngineController();
export default engineController;
