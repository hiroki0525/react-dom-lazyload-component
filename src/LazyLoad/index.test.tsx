import { cleanup } from '@testing-library/react';

describe('LazyLoad', () => {
  afterEach(cleanup);

  describe('out of view', () => {
    it('tmp test', () => {
      expect(1 + 1).toBe(2);
    });
  });

  describe('in view', () => {});
});
