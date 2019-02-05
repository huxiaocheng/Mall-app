const state = {
  keyword: '',
  historyList: JSON.parse(localStorage.getItem('historyList')) || [],
  addressInfo: JSON.parse(localStorage.getItem('addressInfo')) || {}
};
export default state;