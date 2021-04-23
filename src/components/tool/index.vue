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
      handler: function (val) {
        // console.log(`工具栏变化`);
      },
      deep: true,
    },
    // 双屏状态
    "toolList.0": {
      handler: function (val) {
        this.setDoubleScreen(val.active)
      },
      deep: true,
    },
  },
  methods: {
    ...mapMutations({
      setToolItem: "tool/setToolItem",
      setDoubleScreen: 'earth/setDoubleScreen'
    }),
    setTool(item, index) {
      this.setToolItem({ item, index });
    },
  },
};
</script>
