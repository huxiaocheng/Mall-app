import * as types from './types';

const mutations = {
  [types.SET_KEYWORD](state, keyword) {
    state.keyword = keyword;
  },
  [types.ADD_HISTORY_LIST](state, list) {
    state.historyList = list;
  }
};

export default mutations;