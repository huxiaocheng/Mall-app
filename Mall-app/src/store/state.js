const state = {
  keyword: '',
  historyList: JSON.parse(localStorage.getItem('historyList')) || [],
  addressInfo: {}
};
export default state;