<template>
  <!-- eslint-disable -->
  <div id="app">
    <!-- 系统标题 -->
    <title-bar />
    <!-- 底图 -->
    <leaflet-map />
    <!-- 工具栏 -->
    <tool/>
    <!-- 菜单栏 -->
    <!-- <menu-bar /> -->
  </div>
</template>

<script>
/* eslint-disable */
import leafletMap from "@/components/map/index.vue";
import tool from "@/components/tool/index.vue";
import menuBar from "@/components/menu/index.vue";
import titleBar from "@/components/title/index.vue"
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    leafletMap,
    tool,
    menuBar,
    titleBar
  },
  computed: {
    ...mapState({}),
  },
  mounted() {},
  methods: {},
};
</script>
