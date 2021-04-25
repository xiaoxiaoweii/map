<template>
  <!-- eslint-disable-->
  <div
    id="tool_wrapper"
    class="tool_wrapper"
  >
    <div
      class="tool_item"
      v-for="(item,index) in toolList"
      :key="index"
      @click="setTool(item,index)"
    >
      <img :src="item.active?item.activeSrc:item.deactiveSrc">
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      toolList: (s) => s.tool.toolList,
    }),
  },
  watch: {
    toolList: {
      handler: function (val) {},
      deep: true,
    },
    // 双屏状态
    "toolList.0": {
      handler: function (val) {
        this.setDoubleScreen(val.active)
      },
      deep: true,
    },
    // 经纬度网格状态
    "toolList.1": {
      handler: function(val) {
        this.setGridLayer(val.active)
      },
      deep: true
    },
    // 测距
    "toolList.3": {
      handler: function(val) {
        this.setDistanceMeasure(val.active)
      },
      deep: true
    },
    // 测面积
    "toolList.4": {
      handler: function(val) {
        this.setAreaMeasure(val.active)
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations({
      setToolItem: "tool/setToolItem",
      setDoubleScreen: 'earth/setDoubleScreen',
      setGridLayer: 'earth/setGridLayer',
      setDistanceMeasure: 'earth/setDistanceMeasure',
      setAreaMeasure: 'earth/setAreaMeasure'
    }),
    setTool(item, index) {
      this.setToolItem({ item, index });
    },
  },
};
</script>
