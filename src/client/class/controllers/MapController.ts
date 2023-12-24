import MudFlatsMap from '../../data/maps/MudFlats';
import ShoreMap from '../../data/maps/Shore';
import type Map from '../Map';

export default class MapController {
	private CurrentMapClass = ShoreMap;

	getCurrentMap(): Map {
		return new this.CurrentMapClass();
	}

	goToMudFlats(): void {
		this.CurrentMapClass = MudFlatsMap;
	}
}
