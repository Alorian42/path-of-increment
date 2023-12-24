import Item, { ITEM_TYPES } from './Item';

export default class BodyArmor extends Item {
	constructor(id: number, name: string, image: string) {
		super(id, name, image, ITEM_TYPES.BODY_ARMOR);
	}
}
