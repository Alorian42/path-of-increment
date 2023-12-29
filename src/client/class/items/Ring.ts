import type { ITEM_RARITY_TYPE_VALUE } from '../../config/item';
import Item, { ITEM_TYPES } from './Item';

export default abstract class Ring extends Item {
	constructor(name: string, image: string, rarity: ITEM_RARITY_TYPE_VALUE, itemLevel: number) {
		super(name, image, ITEM_TYPES.RING, rarity, itemLevel);
	}
}
