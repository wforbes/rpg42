export const queryKeys = {
	user: ['user'],
	session: {
		verify: () => ['session', 'verify'] as const,
	},
};
