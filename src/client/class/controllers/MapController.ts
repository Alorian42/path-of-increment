import { DEFAULT_ENEMY_COUNT } from '../../config/maps';
import type ZombieEnemy from '../../data/enemy/ZombieEnemy';
import type Map from '../map/Map';
import MapZone from '../map/MapZone';

class MapController {
	private currentMap!: Map | null;
	private zone!: MapZone | null;

	public getCurrentMap(): Map | null {
		return this.currentMap;
	}

	public getCurrentZone(): MapZone | null {
		return this.zone;
	}

	public startMap(MapClass: any): void {
		if (MapClass === null) {
			this.currentMap = null;
			this.zone = null;
			return;
		}

		this.currentMap = new MapClass('normal');
		this.currentMap?.identify();
		this.zone = new MapZone(this.currentMap as unknown as Map);
		this.populateZone();
	}

	protected populateZone(): void {
		if (this.zone === null) {
			return;
		}

		const count = Math.floor(DEFAULT_ENEMY_COUNT * this.zone.mapPackSize);
		const enemyTypes = this.currentMap?.getEnemyTypes() ?? [];

		if (enemyTypes.length === 0) {
			console.error('No enemy types found for map', this.currentMap);
			return;
		}

		if (this.currentMap === null) {
			console.error('No current map found for zone', this.zone);
			return;
		}

		for (let i = 0; i < count; i += 1) {
			const EnemyClass = enemyTypes[
				Math.floor(Math.random() * enemyTypes.length)
			] as unknown as typeof ZombieEnemy;
			const enemy = new EnemyClass(
				this.zone.getLevel(),
				this.currentMap.getRarity(),
				this.currentMap.getLootTable()
			);

			this.zone.addEnemy(enemy);
		}
	}
}

const mapController = new MapController();
export default mapController;
