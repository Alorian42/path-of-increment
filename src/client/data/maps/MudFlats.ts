import Map from '../../class/map/Map';
import EntityRegisterController from '../../class/controllers/EntityRegisterController';
import type Item from '../../class/items/Item';
import { type ITEM_RARITY_TYPE_VALUE } from '../../config/item';
import CoralAmulet from '../items/CoralAmulet';
import IronRing from '../items/IronRing';
import LeatherBelt from '../items/LeatherBelt';
import LeatherBoots from '../items/LeatherBoots';
import LeatherChest from '../items/LeatherChest';
import LeatherGloves from '../items/LeatherGloves';
import LeatherHelmet from '../items/LeatherHelmet';
import WoodenWand from '../items/WoodenWand';

export default class MudFlatsMap extends Map {
	constructor(rarity: ITEM_RARITY_TYPE_VALUE) {
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
		super('MudFlats', '02.png', rarity, 15, lootTable);
	}

	protected selfRegister(): void {
		EntityRegisterController.registerEntity(MudFlatsMap, 100002);
	}

	protected addImplicits(): void {
		// @TODO
	}

	protected setupPrefixPool(): void {
		// @TODO
	}

	protected setupSuffixPool(): void {
		// @TODO
	}
}
