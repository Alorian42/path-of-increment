import type Player from '../../../class/player/Player';
import Prefix from '../../../class/affixes/Prefix';

export default class MinPhysDmgMultiSmall extends Prefix {
	public static weight: number = 50;

	constructor() {
		const text = 'Increases minimum physical damage multiplier by';

		super(1, text, 0.1, 0.01);
		this.valueRound = 2;
	}

	public equip(player: Player): void {
		player.modifyStat('multiplierPhysicalDamageMin', this.getValue());
	}

	public unequip(player: Player): void {
		player.modifyStat('multiplierPhysicalDamageMin', -this.getValue());
	}
}
