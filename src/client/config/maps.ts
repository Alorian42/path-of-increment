import type Map from '../class/map/Map';
import MudFlatsMap from '../data/maps/MudFlats';
import ShoreMap from '../data/maps/Shore';

export const MAP_POOL: Array<typeof Map> = [ShoreMap, MudFlatsMap];

export const DEFAULT_ENEMY_COUNT = 2;
