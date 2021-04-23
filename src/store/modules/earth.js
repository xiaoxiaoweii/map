/* eslint-disable */
const state = {
  extent: null,
  // 是否开启双屏
  doubleScreenFlag: false
}

const actions = {
  
}

const mutations = {
  setExtent(state, val) {
    state.extent = val
  },
  setDoubleScreen(state,val) {
    state.doubleScreenFlag = val
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}