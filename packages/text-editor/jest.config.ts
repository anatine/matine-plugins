/* eslint-disable */
export default {
  displayName: 'text-editor',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': [
      '@swc/jest',
      { jsc: { transform: { react: { runtime: 'automatic' } } } },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/packages/text-editor',
  setupFilesAfterEnv: [
    '../../configuration/jest/jsdom.mocks.js',
    '@testing-library/jest-dom/extend-expect',
  ],
};
