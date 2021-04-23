<template>
  <!-- eslint-disable -->
  <div class="map_wrapper" id="map_wrapper">
    <div id="map" ref="map"></div>
    <div id="subMap" ref="subMap"></div>
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
import { mapState, mapMutations } from "vuex";
export default {
  name: "leaflet-map",
  data() {
    return {
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
    // 地图初始化
    this.initMap();
    this.initSubMap();
  },
  methods: {
    ...mapMutations({
      setExtent: "earth/setExtent",
    }),
    // 初始化主地图
    initMap() {
      /* 地图 */
      let map = L.map("map", {
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
      let layer = L.tileLayer(
        "http:////map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
        {
          subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
        }
      );
      layer.addTo(map);
      map.setView([30.2, 119.7], 5);
      window.latlngGraticule = L.latlngGraticule({
        showLabel: true,
        dashArray: [4, 4],
        fontColor: "#999999",
        zoomInterval: this.$constants.initLeafletMap.graticule_zoom,
      }).addTo(map);
      this.map = map;
      window.map = map;
      // 自动显示经纬度
      this.showLatlon();
      // 加载边界
      this.loadBoundaries(window.map);
      // 范围变化
      this.changeMove();
    },
    // 辅助地图
    initSubMap() {
      /* 地图 */
      let subMap = L.map("subMap", {
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
      let layer = L.tileLayer(
        "http:////map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
        {
          subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
        }
      );
      layer.addTo(subMap);
      L.latlngGraticule({
        showLabel: true,
        dashArray: [4, 4],
        fontColor: "#999999",
        zoomInterval: this.$constants.initLeafletMap.graticule_zoom,
      }).addTo(subMap);
      subMap.setView([30.2, 119.7], 5);
      window.subMap = subMap
      // 加载边界
      this.loadBoundaries(window.subMap);
    },
    // 加载边界
    loadBoundaries(map) {
      const that = this;
      this.$jQuery.getJSON("./static/geojson/provinces.geojson", function (data) {
        L.geoJSON(data, {
          style: (feature) => {
            return that.$constants.boundaryOptions;
          },
        }).addTo(map);
      });
    },
    // 显示经纬度
    showLatlon() {
      window.map.on("mousemove", (e) => {
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
