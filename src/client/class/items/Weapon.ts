import Item, { ITEM_TYPES } from './Item';

export default class Weapon extends Item {
	constructor(id: number, name: string, image: string) {
		super(id, name, image, ITEM_TYPES.WEAPON);
	}
}
