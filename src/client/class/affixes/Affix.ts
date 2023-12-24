import type Player from '../player/Player';

export default abstract class Affix {
	private readonly id: number;
	private readonly name: string;
	private readonly type: TYPE_HELPER;
	private readonly valueMax: number;
	private readonly valueMin: number;

	private value!: number;
	private valueAssigned: boolean = false;

	constructor(id: number, name: string, valueMax: number, valueMin: number, type: TYPE_HELPER) {
		this.id = id;
		this.name = name;
		this.type = type;
		this.valueMax = valueMax;
		this.valueMin = valueMin;
	}

	public getId(): number {
		return this.id;
	}

	public getName(): string {
		return this.name;
	}

	public getType(): TYPE_HELPER {
		return this.type;
	}

	public getValueMax(): number {
		return this.valueMax;
	}

	public getValueMin(): number {
		return this.valueMin;
	}

	public getValue(): number {
		return this.value;
	}

	public assignValue(): void {
		this.value = Math.floor(Math.random() * (this.valueMax - this.valueMin + 1) + this.valueMin);
		this.valueAssigned = true;
	}

	public isValueAssigned(): boolean {
		return this.valueAssigned;
	}

	public toString(): string {
		return `${this.name} ${this.value} [${this.valueMin} - ${this.valueMax}]]`;
	}

	public abstract equip(player: Player): void;
	public abstract unequip(player: Player): void;
}

export const AFFIXES_TYPES = {
	PREFIX: 'prefix',
	IMPLICIT: 'implicit',
	SUFFIX: 'suffix',
};

type TYPE_HELPER = (typeof AFFIXES_TYPES)[keyof typeof AFFIXES_TYPES];
