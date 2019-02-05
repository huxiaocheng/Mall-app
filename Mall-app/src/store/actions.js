import * as types from './types';

export const addHistory = ({commit, state}, keyword) => {
  let list = state.historyList.slice();
  let id = list.findIndex(v => {
    return v === keyword;
  })
  if(id > -1) {
    list.splice(id, 1);
    list.unshift(keyword);
  } else {
    list.push(keyword)
  }
  if(list.length > 50) {
    list = list.slice(0, 50);
  }
  localStorage.setItem('historyList', JSON.stringify(list));
  commit(types.ADD_HISTORY_LIST, list);
};

export const removeARecord = ({commit, state}, index) => {
  let list = state.historyList.slice();
  list.splice(index, 1);
  localStorage.setItem('historyList', JSON.stringify(list));
  commit(types.ADD_HISTORY_LIST, list);
};

export const removeAddress = ({commit, state}, id) => {
  if (id === state.addressInfo.id) {
    commit(types.SAVE_ADDRESS_INFO, {});
    localStorage.removeItem('addressInfo');
  }
};