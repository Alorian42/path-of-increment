import currencyController from './CurrencyController';
import inventoryController from './InventoryController';
import lootController from './LootController';
import mapController from './MapController';

class EngineController {
	private initialized = false;

	public init(): void {
		if (this.initialized) {
			return;
		}

		for (let i = 0; i < 5; i += 1) {
			const testItem2 = lootController.generateItem(mapController.getCurrentMap());
			currencyController.useCurrency('transmute', testItem2);
			inventoryController.addItem(testItem2);
		}

		this.initialized = true;
	}
}

const engineController = new EngineController();
export default engineController;
