import MudFlatsMap from '../../data/maps/MudFlats';
import ShoreMap from '../../data/maps/Shore';
import type Map from '../Map';

class MapController {
	private CurrentMapClass = ShoreMap;

	getCurrentMap(): Map {
		return new this.CurrentMapClass();
	}

	goToMudFlats(): void {
		this.CurrentMapClass = MudFlatsMap;
	}
}

const mapController = new MapController();
export default mapController;
