<template>
  <div id="menu_wrapper" class="menu_wrapper">
    <div
      class="menu_item"
      v-for="(item, index) in menuList"
      :key="index"
      :style="item.active ? 'color:#ffffff;background:rgb(62, 70, 172)' : ''"
      @click="changeMenu(item,index)"
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
          type: "scenic",
          name: "景点",
          active: false,
        },
        {
          type: "scenic",
          name: "天气",
          active: false,
        },
      ],
    };
  },
  methods: {
    changeMenu(item,index) {
      item.active = !item.active
      if(item.type === 'scenic') {
        if(item.active) {
          window.map.on('click', (event) => {
            const latlng = {
              lat: event.latlng.lat,
              lng: event.latlng.lng
            }
            var marker = L.marker([latlng.lat,latlng.lng]).addTo(window.map);
            this.loadScenicData(latlng)
          });
        } else {
          /* 销毁点击事件 */
          window.map.off('click');
        }
      }
    },
    loadScenicData(latlng) {
      this.$axios.get(`${window.globalConfig.baseURL}/v2/poi/lookup`,{
        params: {
          location: `${latlng.lng},${latlng.lat}`,
          key: this.$constants.qweatherKey,
          type: 'scenic' 
        }
      }).then(res => {
        console.log(`res`,res)
      })
    }
  }
};
</script>