<template>
  <!-- eslint-disable -->
  <div
    class="map_wrapper"
    id="map_wrapper"
  >
    <div
      v-for="(item,index) in mapList"
      :key="index"
      :id="item.id"
      :ref="item.id"
      :style="{ width: item.style.width}"
    ></div>
    <!-- <div
      :style=""
      id="map"
      ref="map"
    ></div>
    <div
      id="subMap"
      ref="subMap"
    ></div> -->
    <div class="other_btn">
      <div class="latlng">
        <img src="@/assets/images/map/position.svg" />
        <div class="other_lat">{{ position.latNum }}</div>
        <div class="other_lon">{{ position.lonNum }}</div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
const layerUrl =
  "http:////map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}";
import { mapState, mapMutations } from "vuex";
export default {
  name: "leaflet-map",
  data() {
    return {
      // 双屏属性
      mapList: [
        {
          style: {
            width: "50%",
          },
          name: "左屏",
          id: "leftMap",
          type: "left",
          map: null,
          marker: null,
        },
        {
          style: {
            width: "50%",
          },
          name: "右屏",
          id: "rightMap",
          type: "right",
          map: null,
          marker: null,
        },
      ],
      // 定时器，1秒只响应一次
      timer: null,
      // 地图载体
      map: "",
      // 经纬度显示
      position: {
        latNum: null,
        lonNum: null,
      },
    };
  },
  computed: {
    ...mapState({
      doubleScreenFlag: (s) => s.earth.doubleScreenFlag,
    }),
  },
  watch: {
    doubleScreenFlag: {
      handler: function (val) {
        console.log("开启双屏", val);
      },
      deep: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      // 地图初始化
      this.initMap();
    });
  },
  methods: {
    ...mapMutations({
      setExtent: "earth/setExtent",
    }),
    // 初始化地图
    initMap() {
      this.mapList.forEach((e, i) => {
        e.map = L.map(e.id, {
          attributionControl: false,
          // 墨卡托投影
          crs: L.CRS.EPSG3857,
          minZoom: 2,
          maxZoom: 13,
          worldCopyJump: true,
          maxBounds: [
            [1800, -1800],
            [-1800, 1800],
          ],
          zoomControl: false,
        });
        let layer = L.tileLayer(layerUrl, {
          subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
        });
        layer.addTo(e.map);
        // 视角
        e.map.setView([30.2, 119.7], 5);
        // 加载边界
        this.loadBoundaries(e.map);
        // 显示经纬度
        this.showLatlon(e.map);
        // 监听各个地图移动和放大缩小事件
        e.map.on({
          drag: (e) => {
            this.maplink(e);
          },
          zoom: (e) => {
            this.maplink(e);
          }
        });
        // 监听鼠标移动事件
        e.map.on("mousemove", (e) => {
          this.onMoveUp(e);
        });
      });
    },
    // 鼠标移动变化
    onMoveUp(e) {
      this.mapList.forEach((r, i) => {
        // 当前移动的地图不显示marker
        // 清除之前的marker
        if (r.marker) {
          r.marker.remove();
        }
        if (e.target._container.id === r.id) {
          return;
        }
        // 声明marker样式
        let myIcon = L.icon({
          iconUrl: "./images/hand.svg",
          iconSize: [17, 23],
        });
        // 添加移动marker
        r.marker = L.marker(e.latlng, {
          icon: myIcon,
        }).addTo(r.map);
      });
    },
    // 视角变化 其他地图联动
    maplink(e) {
      this.mapList.forEach((r, i) => {
        r.map.setView(e.target.getCenter(), e.target._zoom);
      });
    },
    // 加载边界
    loadBoundaries(map) {
      this.$jQuery.getJSON(
        "./static/geojson/provinces.geojson",
        (data) => {
          L.geoJSON(data, {
            style: (feature) => {
              return this.$constants.boundaryOptions;
            },
          }).addTo(map);
        }
      );
    },
    // 显示经纬度
    showLatlon(map) {
      map.on("mousemove", (e) => {
        let latlng = L.latLng(e.latlng.lat, e.latlng.lng).wrap();
        this.position.latNum =
          latlng.lat > 0
            ? Math.abs(latlng.lat).toFixed(3) + " N"
            : Math.abs(latlng.lat).toFixed(3) + " S";
        this.position.lonNum =
          latlng.lng > 0
            ? Math.abs(latlng.lng).toFixed(3) + " E"
            : Math.abs(latlng.lng).toFixed(3) + " W";
      });
    },
    // 移动视角
    changeMove() {
      window.map.on("moveend", (ev) => {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.getExtent();
        }, 1000);
      });
    },
    // 获取当前视角范围
    getExtent() {
      let zoom = window.map.getZoom();
      let bounds = window.map.getBounds();
      let min = bounds.getSouthWest().wrap();
      let max = bounds.getNorthEast().wrap();
      let xMin = min.lng;
      let xMax = max.lng;
      let yMin = min.lat;
      let yMax = max.lat;

      let extent = {
        xMin: xMin,
        xMax: xMax,
        yMin: yMin,
        yMax: yMax,
        zoom: zoom,
      };
      this.setExtent(extent);
    },
  },
};
</script>
