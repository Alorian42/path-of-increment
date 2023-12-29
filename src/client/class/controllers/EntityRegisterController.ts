import type AffixUser from '../AffixUser';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class EntityRegisterController {
	private static readonly entities: Record<number, typeof AffixUser> = {};

	public static registerEntity(entity: typeof AffixUser, id: number): void {
		const foundEntityById = this.getEntityById(id);
		const foundIdByEntity = this.getEntityByName(entity.name);
		const isItTheSame = foundEntityById !== undefined && foundIdByEntity === foundEntityById;

		if (foundEntityById === undefined && foundIdByEntity === undefined) {
			this.entities[id] = entity;
		} else if (!isItTheSame) {
			throw new Error(
				`Failed to register entity ${entity.name} with id ${id}. Id is already taken by ${foundEntityById?.name} or name is already taken by ${foundIdByEntity?.name}`
			);
		}
	}

	public static getEntityById(id: number): typeof AffixUser | undefined {
		return this.entities[id];
	}

	public static getEntityByName(name: string): typeof AffixUser | undefined {
		return Object.values(this.entities).find(e => e.name === name);
	}

	public static getIdByEntity(entity: typeof AffixUser): number | undefined {
		const id = Object.entries(this.entities).find(([, e]) => e.name === entity.name);

		return id !== undefined ? Number(id[0]) : undefined;
	}
}
