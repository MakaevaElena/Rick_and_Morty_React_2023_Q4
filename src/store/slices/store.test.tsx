import { store } from '../store';
describe('Games redux state tests', () => {
  it('Should initially set searchValue to empty string', () => {
    const state = store.getState().data;
    expect(state.searchValue).toEqual('');
  });
});
