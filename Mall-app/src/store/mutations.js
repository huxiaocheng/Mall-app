import * as types from './types';

const mutations = {
  [types.SET_KEYWORD](state, keyword) {
    state.keyword = keyword
  }
};

export default mutations;