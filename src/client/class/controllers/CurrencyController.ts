import TransmuteCurrency from '../../data/currency/TransmuteCurrency';
import type { CURRENCY_TYPES_HELPER } from '../../config/currency';
import type Currency from '../Currency';
import type Item from '../items/Item';

class CurrencyController {
	private readonly currencies: Currency[] = currencyTypes.map(CurrencyType => new CurrencyType());
	private readonly amount: number[] = Array(currencyTypes.length).fill(10);

	public get bank(): { [key in CURRENCY_TYPES_HELPER]: number } {
		const types = this.currencies.map(currency => currency.getType());

		return types.reduce(
			(acc, type, index) => ({
				...acc,
				[type]: this.amount[index],
			}),
			{}
		) as { [key in CURRENCY_TYPES_HELPER]: number };
	}

	public getCurrencies(): Currency[] {
		return this.currencies;
	}

	public hasCurrency(type: CURRENCY_TYPES_HELPER): boolean {
		return this.bank[type] > 0;
	}

	public useCurrency(type: CURRENCY_TYPES_HELPER, item: Item): void {
		if (!this.hasCurrency(type)) {
			return;
		}

		const currency = this.currencies.find(cur => cur.getType() === type);
		if (currency !== undefined) {
			currency.apply(item);

			const index = this.currencies.findIndex(cur => cur.getType() === type);
			this.amount[index] -= 1;
		}
	}
}

const currencyTypes = [TransmuteCurrency];

const currencyController = new CurrencyController();
export default currencyController;
