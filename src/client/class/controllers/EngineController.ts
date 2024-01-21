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
import type Enemy from '../enemy/Enemy';
import EventBus from '../EventBus/EventBus';
import MapFinishEvent from '../EventBus/MapFinishEvent';

class EngineController {
	private initialized = false;
	private isMapRunning = false;
	private runningTimeout: number | null = null;
	private readonly eventBus = EventBus.getInstance();

	public init(): void {
		if (this.initialized) {
			return;
		}

		this.initialized = true;
	}

	public startMap(map: typeof Map): void {
		if (this.isMapRunning) {
			return;
		}

		mapController.startMap(map);

		this.nextEnemy();
	}

	protected nextEnemy(): boolean {
		const currentMap = mapController.getCurrentMap();
		const currentZone = mapController.getCurrentZone();

		if (currentMap === null || currentZone === null) {
			console.error('No current map or zone found');
			return false;
		}

		const nextEnemy = currentZone.getNextEnemy();

		if (nextEnemy === null) {
			return false;
		}

		const duration =
			currentMap.getMinDuration() *
			this.calculateDurationModifier(currentMap, nextEnemy, currentZone) *
			1000;

		currentMap.endTimestamp = Date.now() + duration;

		this.runningTimeout = window.setTimeout(() => {
			const possibleEnemy = currentZone.getEnemies().shift();

			if (possibleEnemy !== undefined) {
				this.awardLoot(possibleEnemy);
			}

			if (currentZone.getEnemies().length === 0) {
				this.finishMap();
			} else {
				this.nextEnemy();
			}
		}, duration);

		return true;
	}

	public finishMap(): void {
		if (this.runningTimeout !== null) {
			window.clearTimeout(this.runningTimeout);
		}
		mapController.startMap(null);

		this.isMapRunning = false;
		this.eventBus.publish(new MapFinishEvent());
	}

	public awardLoot(enemy: Enemy): void {
		// Awarding items 0 - 1
		const amount = Math.floor(Math.random() * 2);

		console.log('Awarding', amount, 'items');

		for (let i = 0; i < amount; i += 1) {
			const item = lootController.generateItem(enemy);
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

	private calculateDurationModifier(map: Map, enemy: Enemy, zone: MapZone): number {
		const player = playerController.getPlayer();

		const statModifier = this.compareStats(player, enemy, zone);

		return Math.max(statModifier, 1);
	}

	private compareStats(player: Player, enemy: Enemy, zone: MapZone): number {
		let modifier: number = 0;

		// Calculate damage
		let totalDamage = 0;

		// Physical damage
		totalDamage += this.calculatePhysicalDamage(player, enemy);

		// Damage modifier
		modifier += Calculator.calculateModifier(totalDamage, zone.getDamageThreshold());

		return modifier;
	}

	private calculatePhysicalDamage(player: Player, enemy: Enemy): number {
		const playerPhysicalDamage = player.physicalDamage;
		const zonePhysicalDamageReduction = Calculator.calculatePhysicalDamageReduction(enemy);

		return playerPhysicalDamage * (1 - zonePhysicalDamageReduction);
	}

	public isRunning(): boolean {
		return this.isMapRunning;
	}
}

const engineController = new EngineController();
export default engineController;
