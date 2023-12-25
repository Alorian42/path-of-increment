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
} as const;
export const ITEM_SUFFIX_LIMIT: {
	[key in ITEM_RARITY_TYPE_VALUE]: number;
} = {
	[ITEM_RARITY.NORMAL]: 0,
	[ITEM_RARITY.MAGIC]: 1,
	[ITEM_RARITY.RARE]: 3,
	[ITEM_RARITY.UNIQUE]: 3,
} as const;
export const ITEM_IMPLICIT_LIMIT: {
	[key in ITEM_RARITY_TYPE_VALUE]: number;
} = {
	[ITEM_RARITY.NORMAL]: 10,
	[ITEM_RARITY.MAGIC]: 10,
	[ITEM_RARITY.RARE]: 10,
	[ITEM_RARITY.UNIQUE]: 10,
} as const;

export const ITEM_COLOR: {
	[key in ITEM_RARITY_TYPE_VALUE]: string;
} = {
	[ITEM_RARITY.NORMAL]: '#000000',
	[ITEM_RARITY.MAGIC]: '#8888FF',
	[ITEM_RARITY.RARE]: '#FFFF77',
	[ITEM_RARITY.UNIQUE]: '#AF6025',
} as const;

export const ITEM_RARITY_CHANCES: {
	[key in ITEM_RARITY_TYPE_VALUE]: number;
} = {
	[ITEM_RARITY.NORMAL]: 0.69,
	[ITEM_RARITY.MAGIC]: 0.2,
	[ITEM_RARITY.RARE]: 0.1,
	[ITEM_RARITY.UNIQUE]: 0.01,
} as const;

export const ITEM_AFFIXES_GURANTEED: {
	[key in ITEM_RARITY_TYPE_VALUE]: number;
} = {
	[ITEM_RARITY.NORMAL]: 0,
	[ITEM_RARITY.MAGIC]: 1,
	[ITEM_RARITY.RARE]: 2,
	[ITEM_RARITY.UNIQUE]: 6,
} as const;
