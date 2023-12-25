import type { CURRENCY_TYPES_HELPER } from '../config/currency';
import type Item from './items/Item';

export default abstract class Currency {
	constructor(
		private readonly type: CURRENCY_TYPES_HELPER,
		private readonly name: string,
		private readonly description: string,
		private readonly image: string
	) {}

	public getType(): CURRENCY_TYPES_HELPER {
		return this.type;
	}

	public getName(): string {
		return this.name;
	}

	public getDescription(): string {
		return this.description;
	}

	public getImage(): URL {
		return new URL(`../assets/currency/${this.image}`, import.meta.url);
	}

	public abstract apply(item: Item): Item;
}
