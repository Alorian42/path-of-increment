import Affix, { AFFIXES_TYPES } from './Affix';

export default abstract class Prefix extends Affix {
	constructor(id: number, name: string, valueMax: number, valueMin: number) {
		super(id, name, valueMax, valueMin, AFFIXES_TYPES.PREFIX);
	}
}
