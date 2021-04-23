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
    console.log(`变化`,val);
  },
  setDoubleScreen(state,val) {
    console.log(val,`双屏`)
    state.doubleScreenFlag = val
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}