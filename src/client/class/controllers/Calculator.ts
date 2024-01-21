import { ARMOR_CONSTANT, MAX_DAMAGE_REDUCTION, MAX_MODIFIER, MODIFIER_CONSTANT } from '../../config/calculator';
import type Enemy from '../enemy/Enemy';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class Calculator {
	public static calculatePhysicalDamageReduction(enemy: Enemy): number {
		const enemyArmor = enemy.armor;
		const enemyLevel = enemy.getLevel();

		const baseReduction = Math.E ** ((-1 * enemyLevel) / (enemyArmor / ARMOR_CONSTANT));
		const realReduction = Math.min(baseReduction, MAX_DAMAGE_REDUCTION);

		return realReduction;
	}

	/**
	 * Calculates the modifier for the given value and threshold.
	 */
	public static calculateModifier(value: number, threshold: number): number {
		console.log('threshold', threshold, 'value', value, 'MODIFIER_CONSTANT', MODIFIER_CONSTANT);
		if (value > threshold) {
			console.log(Math.E ** ((-1 * value) / (threshold / MODIFIER_CONSTANT)));
			return Math.E ** ((-1 * value) / (threshold / MODIFIER_CONSTANT));
		}

		console.log(1 / Math.E ** ((-1 * threshold) / (value * MODIFIER_CONSTANT)));
		return Math.min(MAX_MODIFIER, 1 / Math.E ** ((-1 * threshold) / (value * MODIFIER_CONSTANT)));
	}
}
