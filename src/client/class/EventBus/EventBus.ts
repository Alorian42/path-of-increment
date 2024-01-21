import type Event from './Event';

export default class EventBus {
	private static instance: EventBus;
	private events: Record<string, Function[]>;

	private constructor() {
		this.events = {};
	}

	public static getInstance(): EventBus {
		if (EventBus.instance === undefined) {
			EventBus.instance = new EventBus();
		}

		return EventBus.instance;
	}

	public subscribe(event: Event, callback: Function): void {
		if (this.events[event.toString()] === undefined) {
			this.events[event.toString()] = [];
		}

		this.events[event.toString()].push(callback);
	}

	public unsubscribe(event: Event, callback: Function): void {
		if (this.events[event.toString()] === undefined) {
			return;
		}

		this.events[event.toString()] = this.events[event.toString()].filter(cb => cb !== callback);
	}

	public publish(event: Event, ...args: any): void {
		if (this.events[event.toString()] === undefined) {
			return;
		}

		console.log(`Publishing event ${event.toString()}`);

		// eslint-disable-next-line n/no-callback-literal, @typescript-eslint/no-unsafe-argument
		this.events[event.toString()].forEach(callback => callback(...args));
	}
}
