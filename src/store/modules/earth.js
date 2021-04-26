/* eslint-disable */
const state = {
  extent: null,
  // 是否开启双屏
  doubleScreenFlag: false,
  // 是否载入经纬度网格
  gridFlag: false,
  // 测距
  distanceFlag: false,
  // 测面积
  areaMeasureFlag: false
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
  },
  setDistanceMeasure(state,val) {
    state.distanceFlag = val
  },
  setAreaMeasure(state,val) {
    state.areaMeasureFlag = val
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}