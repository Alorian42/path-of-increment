// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class MapStats {
	public static getDefaults(): Record<MAP_STATS_TYPE_HELPER, number> {
		return {
			itemQuantity: 1,
			additionalItemQuantity: 0,
			multiplierItemQuantity: 1,
			itemRarity: 1,
			additionalItemRarity: 0,
			multiplierItemRarity: 1,
			mapPackSize: 1,
			additionalMapPackSize: 0,
			multiplierMapPackSize: 1,
		};
	}
}

export const MAP_STATS = {
	ITEM_QUANTITY: 'itemQuantity',
	ADDITIONAL_ITEM_QUANTITY: 'additionalItemQuantity',
	MULTIPLIER_ITEM_QUANTITY: 'multiplierItemQuantity',
	ITEM_RARITY: 'itemRarity',
	ADDITIONAL_ITEM_RARITY: 'additionalItemRarity',
	MULTIPLIER_ITEM_RARITY: 'multiplierItemRarity',
	MAP_PACK_SIZE: 'mapPackSize',
	ADDITIONAL_MAP_PACK_SIZE: 'additionalMapPackSize',
	MULTIPLIER_MAP_PACK_SIZE: 'multiplierMapPackSize',
} as const;

export type MAP_STATS_TYPE_HELPER = (typeof MAP_STATS)[keyof typeof MAP_STATS];
