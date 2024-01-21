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
import ZombieEnemy from '../enemy/ZombieEnemy';
import type Enemy from '../../class/enemy/Enemy';

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
		const enemyTypes = [ZombieEnemy] as unknown as Array<typeof Enemy>;
		super('MudFlats', '02.png', rarity, 15, lootTable, enemyTypes);
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
