module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/*\\.test\\.tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  preset: 'jest-puppeteer',
};
