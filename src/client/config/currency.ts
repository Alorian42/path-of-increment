export const CURRENCY_TYPES = {
	TRANSMUTE: 'transmute',
} as const;

export type CURRENCY_TYPES_HELPER = (typeof CURRENCY_TYPES)[keyof typeof CURRENCY_TYPES];
