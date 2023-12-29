import type StatUser from '../StatUser';

export default abstract class Affix {
	private readonly id: number;
	private readonly name: string;
	private readonly type: TYPE_HELPER;
	private readonly valueMax: number;
	private readonly valueMin: number;

	private value!: number;
	private valueAssigned: boolean = false;

	protected valueRound: number = 0;
	public static weight: number = 0; // from 0 to 100
	public static itemLevelRequirement: number = 0;

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
		if (this.valueAssigned) {
			return;
		}

		const randomValue = Math.random() * (this.valueMax - this.valueMin) + this.valueMin;
		this.value = Number(randomValue.toFixed(this.valueRound));
		this.valueAssigned = true;
	}

	public isValueAssigned(): boolean {
		return this.valueAssigned;
	}

	public toString(): string {
		return `[${this.getType()}] ${this.name} ${this.value} (${this.valueMin} - ${this.valueMax})`;
	}

	public abstract equip(entity: StatUser): void;
	public abstract unequip(entity: StatUser): void;
}

export const AFFIXES_TYPES = {
	PREFIX: 'prefix',
	IMPLICIT: 'implicit',
	SUFFIX: 'suffix',
};

type TYPE_HELPER = (typeof AFFIXES_TYPES)[keyof typeof AFFIXES_TYPES];
