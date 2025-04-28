export const randomElement = <T>(array: T[]): T =>
	array[Math.floor(array.length * Math.random())];
