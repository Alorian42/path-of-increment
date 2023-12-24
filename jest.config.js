module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.vue$': '@vue/vue3-jest',
		'^.+\\.ts$': 'ts-jest',
	},
	moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
	moduleNameMapper: {
		'^@vue/test-utils$': require.resolve('@vue/test-utils'),
		'^@client/(.*)$': '<rootDir>/src/client/$1',
	},
};
