import Event from './Event';

export default class MapFinishEvent extends Event {
	constructor() {
		super('MapFinishEvent');
	}
}
