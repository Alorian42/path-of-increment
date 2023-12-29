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
import MobArmorBonusSmall from '../affixes/map/implicits/MobArmorBonusSmall';

export default class ShoreMap extends Map {
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
		super('Shore', '01.png', rarity, 10, lootTable);

		this.attackDifficulty = 2;
		this.defenseDifficulty = 2;
		this.speedDifficulty = 2;
		this.minDuration = 10;
	}

	protected selfRegister(): void {
		EntityRegisterController.registerEntity(ShoreMap, 100001);
	}

	protected addImplicits(): void {
		this.addAffix(new MobArmorBonusSmall());
	}

	protected setupPrefixPool(): void {
		// @TODO
	}

	protected setupSuffixPool(): void {
		// @TODO
	}
}
