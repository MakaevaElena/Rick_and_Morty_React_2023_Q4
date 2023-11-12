import { expect, test } from 'vitest';

import { mockPage, mockSearchValue, mockData, mockIsLoading, mockCharacter } from './mocks';

describe('Test for the mocks', () => {
  test('check typeof mockPage', () => {
    expect(mockPage).toBeTypeOf('number');
  });
  test('check typeof mockSearchValue', () => {
    expect(mockSearchValue).toBeTypeOf('string');
  });
  test('check typeof mockData', () => {
    expect(mockData).toBeTypeOf('object');
  });
  test('check typeof mockIsLoading', () => {
    expect(mockIsLoading).toBeTypeOf('boolean');
  });
  test('check typeof mockCharacter', () => {
    expect(mockCharacter).toBeTypeOf('object');
  });
});
