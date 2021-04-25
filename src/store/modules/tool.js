/* eslint-disable */
const state = {
  toolList: [
    {
      name: '双屏',
      activeSrc: require('@/assets/images/tool/doubleActive.svg'),
      deactiveSrc: require('@/assets/images/tool/doubleDeactive.svg'),
      type: 'double',
      active: false
    },
    {
      name: '经纬线',
      activeSrc: require('@/assets/images/tool/gridActive.svg'),
      deactiveSrc: require('@/assets/images/tool/gridDeactive.svg'),
      type: 'grid',
      active: false
    },
    {
      name: '底图切换',
      activeSrc: require('@/assets/images/tool/mapSwitchActive.svg'),
      deactiveSrc: require('@/assets/images/tool/mapSwitchDeactive.svg'),
      type: 'mapSwitch',
      active: false
    },
    {
      name: '测距',
      activeSrc: require('@/assets/images/tool/distanceDeactive.svg'),
      deactiveSrc: require('@/assets/images/tool/distanceDeactive.svg'),
      type: 'distance',
      active: false
    },
    {
      name: '面积',
      activeSrc: require('@/assets/images/tool/areaDeactive.svg'),
      deactiveSrc: require('@/assets/images/tool/areaDeactive.svg'),
      type: 'area',
      active: false
    },
    {
      name: '截图',
      activeSrc: require('@/assets/images/tool/screenActive.svg'),
      deactiveSrc: require('@/assets/images/tool/screenDeactive.svg'),
      type: 'screen',
      active: false
    },
    {
      name: '定位',
      activeSrc: require('@/assets/images/tool/locationActive.svg'),
      deactiveSrc: require('@/assets/images/tool/locationDeactive.svg'),
      type: 'location',
      active: false
    },
    {
      name: '清除',
      activeSrc: require('@/assets/images/tool/clearActive.svg'),
      deactiveSrc: require('@/assets/images/tool/clearDeactive.svg'),
      type: 'clear',
      active: false
    },
    {
      name: '刷新',
      activeSrc: require('@/assets/images/tool/refreshActive.svg'),
      deactiveSrc: require('@/assets/images/tool/refreshDeactive.svg'),
      type: 'refresh',
      active: false
    }
  ]
}

const actions = {

}

const mutations = {
  setToolItem(state,obj) {
    state.toolList[obj.index].active = !state.toolList[obj.index].active
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
