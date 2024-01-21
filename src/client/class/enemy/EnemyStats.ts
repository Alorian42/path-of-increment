// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class EnemyStats {
	public static getDefaults(): Record<ENEMY_STATS_TYPE_HELPER, number> {
		return {
			armor: 1,
			additionalArmor: 0,
			multiplierArmor: 1,
			life: 1,
			additionalLife: 0,
			multiplierLife: 1,
			damage: 1,
			additionalDamage: 0,
			multiplierDamage: 1,
		};
	}
}

export const ENEMY_STATS = {
	ARMOR: 'armor',
	ADDITIONAL_ARMOR: 'additionalArmor',
	MULTIPLIER_ARMOR: 'multiplierArmor',
	LIFE: 'life',
	ADDITIONAL_LIFE: 'additionalLife',
	MULTIPLIER_LIFE: 'multiplierLife',
	DAMAGE: 'damage',
	ADDITIONAL_DAMAGE: 'additionalDamage',
	MULTIPLIER_DAMAGE: 'multiplierDamage',
} as const;

export type ENEMY_STATS_TYPE_HELPER = (typeof ENEMY_STATS)[keyof typeof ENEMY_STATS];
