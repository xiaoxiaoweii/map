<template>
  <div id="menu_wrapper" class="menu_wrapper">
    <div
      class="menu_item"
      v-for="(item, index) in menuList"
      :key="index"
      :style="item.active ? 'color:#ffffff;background:rgb(62, 70, 172)' : ''"
      @click="changeMenu(item, index)"
    >
      {{ item.name }}
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      menuList: [
        {
          type: "weather",
          name: "天气实况",
          active: false,
        },
        {
          type: "warning",
          name: "预警预报",
          active: false,
        },
      ],
    };
  },
  methods: {
    changeMenu(item, index) {
      item.active = !item.active;
    },
  },
};
</script>