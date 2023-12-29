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
	}
}

const mapController = new MapController();
export default mapController;
