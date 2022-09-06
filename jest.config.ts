import { getJestProjects } from '@nrwl/jest';

export default {
  projects: getJestProjects(),
  setupFilesAfterEnv: [
    './configuration/jest/jsdom.mocks.js',
    '@testing-library/jest-dom/extend-expect',
  ],
};
