import Affix, { AFFIXES_TYPES } from './Affix';

export default abstract class Suffix extends Affix {
	constructor(id: number, name: string, valueMax: number, valueMin: number) {
		super(id, name, valueMax, valueMin, AFFIXES_TYPES.SUFFIX);
	}
}
