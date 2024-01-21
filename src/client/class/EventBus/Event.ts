export default abstract class Event {
	constructor(private readonly name: string) {}

	public toString(): string {
		return this.name;
	}
}
