import type Player from '../../../../class/player/Player';
import Prefix from '../../../../class/affixes/Prefix';

export default class MinPhysDmgSmall extends Prefix {
	public static weight: number = 50;

	constructor() {
		const text = 'Increases minimum physical damage by';

		super(1, text, 3, 1);
	}

	public equip(player: Player): void {
		player.modifyStat('additionalPhysicalDamageMin', this.getValue());
	}

	public unequip(player: Player): void {
		player.modifyStat('additionalPhysicalDamageMin', -this.getValue());
	}
}
