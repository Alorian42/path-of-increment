import inventoryController from './InventoryController';
import lootController from './LootController';

class EngineController {
	private initialized = false;

	public init(): void {
		if (this.initialized) {
			return;
		}

		// For testing purposes
		const testItem = lootController.generateItem();
		inventoryController.addItem(testItem);

		this.initialized = true;
	}
}

const engineController = new EngineController();
export default engineController;
