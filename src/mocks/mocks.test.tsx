import { expect, test } from 'vitest';

import {
  mockPage,
  // mockSetPage,
  // mockSetCount,
  mockSearchValue,
  // mockSetSearchValue,
  mockData,
  // mockSetData,
  mockIsLoading,
  mockCharacter,
} from './mocks';

describe('Test for the mocks', () => {
  test('check typeof mockPage', () => {
    expect(mockPage).toBeTypeOf('number');
  });
  // test('check typeof mockSetPage', () => {
  //   expect(mockSetPage).toBeTypeOf('object');
  // });
  // test('check typeof mockSetCount', () => {
  //   expect(mockSetCount).toBeTypeOf('object');
  // });
  test('check typeof mockSearchValue', () => {
    expect(mockSearchValue).toBeTypeOf('string');
  });
  // test('check typeof mockSetSearchValue', () => {
  //   expect(mockSetSearchValue).toBeTypeOf('object');
  // });
  test('check typeof mockData', () => {
    expect(mockData).toBeTypeOf('object');
  });
  // test('check typeof mockSetData', () => {
  //   expect(mockSetData).toBeTypeOf('object');
  // });
  test('check typeof mockIsLoading', () => {
    expect(mockIsLoading).toBeTypeOf('boolean');
  });
  test('check typeof mockCharacter', () => {
    expect(mockCharacter).toBeTypeOf('object');
  });
});
