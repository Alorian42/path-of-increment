export const ITEM_RARITY = {
	NORMAL: 'normal',
	MAGIC: 'magic',
	RARE: 'rare',
	UNIQUE: 'unique',
} as const;
export type ITEM_RARITY_TYPE = keyof typeof ITEM_RARITY;
export type ITEM_RARITY_TYPE_VALUE = (typeof ITEM_RARITY)[ITEM_RARITY_TYPE];
export const ITEM_PREFIX_LIMIT: {
	[key in ITEM_RARITY_TYPE_VALUE]: number;
} = {
	[ITEM_RARITY.NORMAL]: 0,
	[ITEM_RARITY.MAGIC]: 1,
	[ITEM_RARITY.RARE]: 3,
	[ITEM_RARITY.UNIQUE]: 3,
};
export const ITEM_SUFFIX_LIMIT: {
	[key in ITEM_RARITY_TYPE_VALUE]: number;
} = {
	[ITEM_RARITY.NORMAL]: 0,
	[ITEM_RARITY.MAGIC]: 1,
	[ITEM_RARITY.RARE]: 3,
	[ITEM_RARITY.UNIQUE]: 3,
};
export const ITEM_IMPLICIT_LIMIT: {
	[key in ITEM_RARITY_TYPE_VALUE]: number;
} = {
	[ITEM_RARITY.NORMAL]: 10,
	[ITEM_RARITY.MAGIC]: 10,
	[ITEM_RARITY.RARE]: 10,
	[ITEM_RARITY.UNIQUE]: 10,
};
