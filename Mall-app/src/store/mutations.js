import * as types from './types';

const mutations = {
  [types.SET_KEYWORD](state, keyword) {
    state.keyword = keyword;
  },
  [types.ADD_HISTORY_LIST](state, list) {
    if (list.length === 0) {
      localStorage.removeItem('historyList');
    }
    state.historyList = list;
  },
  [types.SAVE_ADDRESS_INFO](state, info) {
    state.addressInfo = info;
    localStorage.setItem('addressInfo',JSON.stringify(info));
  }
};

export default mutations;