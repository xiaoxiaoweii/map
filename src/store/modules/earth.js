/* eslint-disable */
const state = {
  extent: null,
  // 是否开启双屏
  doubleScreenFlag: false,
  // 是否载入经纬度网格
  gridFlag: false
}

const actions = {
  
}

const mutations = {
  setExtent(state, val) {
    state.extent = val
  },
  setDoubleScreen(state,val) {
    state.doubleScreenFlag = val
  },
  setGridLayer(state,val) {
    state.gridFlag = val
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}