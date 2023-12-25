export const CURRENCY_TYPES = {
	TRANSMUTE: 'transmute',
} as const;

export type CURRENCY_TYPES_HELPER = (typeof CURRENCY_TYPES)[keyof typeof CURRENCY_TYPES];

export const CURRENCY_CHANCES: {
	[key in CURRENCY_TYPES_HELPER]: number;
} = {
	[CURRENCY_TYPES.TRANSMUTE]: 0.1,
} as const;
