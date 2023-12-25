import type Player from '../../../class/player/Player';
import Suffix from '../../../class/affixes/Suffix';

export default class MaxPhysDmgSmall extends Suffix {
	public static weight: number = 50;

	constructor() {
		const text = 'Increases maximum physical damage by';

		super(1, text, 10, 1);
	}

	public equip(player: Player): void {
		player.modifyStat('additionalPhysicalDamageMax', this.getValue());
	}

	public unequip(player: Player): void {
		player.modifyStat('additionalPhysicalDamageMax', -this.getValue());
	}
}
