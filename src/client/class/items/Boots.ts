import Item, { ITEM_TYPES } from './Item';

export default class Boots extends Item {
	constructor(id: number, name: string, image: string) {
		super(id, name, image, ITEM_TYPES.BOOTS);
	}
}
