import Event from './Event';

export default class UpdateInventoryEvent extends Event {
	constructor() {
		super('UpdateInventoryEvent');
	}
}
