import { MAX_INVENTORY_SIZE } from '../../config/inventory';
import EventBus from '../EventBus/EventBus';
import UpdateInventoryEvent from '../EventBus/UpdateInventoryEvent';
import type Item from '../items/Item';
import type { ITEM_TYPES } from '../items/Item';
import type Player from '../player/Player';

export class InventoryController {
	private player!: Player;
	private readonly inventory: Array<Item | undefined> = new Array(MAX_INVENTORY_SIZE).fill(undefined);
	private readonly eventBus = EventBus.getInstance();

	public setPlayer(player: Player): void {
		this.player = player;
	}

	public equipItem(item: Item): void {
		const equippedItem = this.player.getEquippedItem(item.getType());
		if (equippedItem !== undefined) {
			this.unequipItem(item.getType());
		}

		this.player.equip(item);

		const index = this.findItemIndex(item.getUUID());
		if (index !== -1) {
			this.inventory[index] = undefined;
		}
	}

	public unequipItem(type: (typeof ITEM_TYPES)[keyof typeof ITEM_TYPES]): void {
		const item = this.player.getEquippedItem(type);

		if (item !== undefined) {
			this.player.unequip(type);
			this.addItem(item);
		}
	}

	public addItem(item: Item): void {
		const index = this.inventory.findIndex(i => i === undefined);

		if (index !== -1) {
			this.inventory[index] = item;
			this.eventBus.publish(new UpdateInventoryEvent());
		}
	}

	public getInventory(): Array<Item | undefined> {
		return this.inventory;
	}

	public findItem(uuid: string): Item | undefined {
		return this.inventory.find(item => item?.getUUID() === uuid);
	}

	protected findItemIndex(uuid: string): number {
		return this.inventory.findIndex(item => item?.getUUID() === uuid);
	}
}

const inventoryController = new InventoryController();
export default inventoryController;
