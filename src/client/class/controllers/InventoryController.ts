import { MAX_INVENTORY_SIZE } from '../../config/inventory';
import type Item from '../items/Item';
import type { ITEM_TYPES } from '../items/Item';
import type Player from '../player/Player';

export class InventoryController {
	private player!: Player;
	private readonly inventory: Array<Item | undefined> = new Array(MAX_INVENTORY_SIZE).fill(undefined);

	public setPlayer(player: Player): void {
		this.player = player;
	}

	public equipItem(item: Item): void {
		const equippedItem = this.player.getEquippedItem(item.getType());

		this.player.equip(item);

		const index = this.findItemIndex(item.getUUID());
		if (index !== -1) {
			this.inventory[index] = undefined;
		}

		if (equippedItem !== undefined) {
			this.unequipItem(item.getType());
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
