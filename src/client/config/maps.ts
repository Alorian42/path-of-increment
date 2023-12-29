import type Map from '../class/map/Map';
import MudFlatsMap from '../data/maps/MudFlats';
import ShoreMap from '../data/maps/Shore';

// eslint-disable-next-line import/prefer-default-export
export const MAP_POOL: Array<typeof Map> = [ShoreMap, MudFlatsMap];
