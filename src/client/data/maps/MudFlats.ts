import Map from '../../class/Map';
import type Item from '../../class/items/Item';
import CoralAmulet from '../items/CoralAmulet';
import IronRing from '../items/IronRing';
import LeatherBelt from '../items/LeatherBelt';
import LeatherBoots from '../items/LeatherBoots';
import LeatherChest from '../items/LeatherChest';
import LeatherGloves from '../items/LeatherGloves';
import LeatherHelmet from '../items/LeatherHelmet';
import WoodenWand from '../items/WoodenWand';

export default class MudFlatsMap extends Map {
	constructor(mapLevel: number) {
		const lootTable = [
			LeatherBoots,
			LeatherChest,
			LeatherBelt,
			LeatherGloves,
			LeatherHelmet,
			CoralAmulet,
			IronRing,
			WoodenWand,
		] as unknown as Array<typeof Item>;
		super('MudFlats', '02.png', mapLevel, lootTable);
	}
}
