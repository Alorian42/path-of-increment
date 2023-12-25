import type Map from '../Map';

class MapController {
	private currentMap!: Map | null;

	public getCurrentMap(): Map | null {
		return this.currentMap;
	}

	public setCurrentMap(MapClass: any): void {
		if (MapClass === null) {
			this.currentMap = null;
			return;
		}

		this.currentMap = new MapClass();
	}
}

const mapController = new MapController();
export default mapController;
