import type { ITEM_RARITY_TYPE_VALUE } from '../../config/item';
import Item, { ITEM_TYPES } from './Item';

export default abstract class Gloves extends Item {
	constructor(id: number, name: string, image: string, rarity: ITEM_RARITY_TYPE_VALUE, itemLevel: number) {
		super(id, name, image, ITEM_TYPES.GLOVES, rarity, itemLevel);
	}
}
