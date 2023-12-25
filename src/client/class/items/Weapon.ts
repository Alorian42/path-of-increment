import type { ITEM_RARITY_TYPE_VALUE } from '../../config/item';
import Item, { ITEM_TYPES } from './Item';

export default abstract class Weapon extends Item {
	constructor(id: number, name: string, image: string, rarity: ITEM_RARITY_TYPE_VALUE) {
		super(id, name, image, ITEM_TYPES.WEAPON, rarity);
	}
}
