export default abstract class Map {
	private readonly name: string;
	private readonly image: string;

	constructor(name: string, image: string) {
		this.name = name;
		this.image = image;
	}

	public getName(): string {
		return this.name;
	}

	public getImage(): URL {
		return new URL(`../assets/maps/${this.image}`, import.meta.url);
	}
}
