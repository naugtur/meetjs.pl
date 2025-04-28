export const sleep = async (ms: number = 1_000) =>
	new Promise((r) => setTimeout(r, ms));
