import Affix, { AFFIXES_TYPES } from './Affix';

export default abstract class Implicit extends Affix {
	public static weight: number = 100;

	constructor(id: number, name: string, valueMax: number, valueMin: number) {
		super(id, name, valueMax, valueMin, AFFIXES_TYPES.IMPLICIT);
	}
}
