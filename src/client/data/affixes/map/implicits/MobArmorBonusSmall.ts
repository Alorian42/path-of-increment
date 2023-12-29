import Implicit from '../../../../class/affixes/Implicit';
import type MapZone from '../../../../class/map/MapZone';

export default class MobArmorBonusSmall extends Implicit {
	constructor() {
		const text = 'Increases monster armor by';

		super(100001, text, 15, 10);
	}

	public equip(zone: MapZone): void {
		zone.modifyStat('multiplierMobArmor', this.getValue());
		zone.modifyStat('additionalItemQuantity', this.getValue() / 10);
	}

	public unequip(zone: MapZone): void {
		zone.modifyStat('multiplierMobArmor', -this.getValue());
		zone.modifyStat('additionalItemQuantity', -this.getValue() / 10);
	}

	public override toString(): string {
		const original = super.toString();

		return `${original} (increases IQ by ${this.getValue() / 10})`;
	}
}
