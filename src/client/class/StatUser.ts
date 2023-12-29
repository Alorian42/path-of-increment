export default abstract class StatUser {
	protected stats: Record<string, number> = {};

	public abstract getStats(): Record<string, number>;
	public abstract modifyStat(stat: string, value: number): void;
}
