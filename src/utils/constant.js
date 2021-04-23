/* eslint-disable */
export const constants = {
  // 初始化leaflet-map
  initLeafletMap: {
    graticule_zoom: [{
        start: 2,
        end: 2,
        interval: 32,
      },
      {
        start: 3,
        end: 3,
        interval: 16,
      },
      {
        start: 4,
        end: 4,
        interval: 8,
      },
      {
        start: 5,
        end: 5,
        interval: 4,
      },
      {
        start: 6,
        end: 6,
        interval: 2,
      },
      {
        start: 7,
        end: 7,
        interval: 1,
      },
      {
        start: 8,
        end: 8,
        interval: 0.5,
      },
      {
        start: 9,
        end: 9,
        interval: 0.25,
      },
      {
        start: 10,
        end: 10,
        interval: 0.125,
      },
      {
        start: 11,
        end: 18,
        interval: 0.0625,
      },
    ],
    mapType: {
      ChinaOnlineStreetPurplishBlue_3857: L.tileLayer(
        "http:////map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}", {
          subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
        }
      ),
    },
    boundaries: {
      counties: {
        color: "#aaaa99",
        weight: 0.6,
        fillColor: "#aaa",
        fillOpacity: 0,
        zIndex: 700,
        className: "county_bnd",
      },
      cities: {
        color: "#777777",
        weight: 0.8,
        fillColor: "#888",
        fillOpacity: 0,
        zIndex: 2000,
        className: "city_bnd",
      },
      provinces: {
        color: "#bb0000",
        weight: 1,
        fillColor: "#aaa",
        fillOpacity: 0,
        zIndex: 5000,
        className: "province_bnd",
      }
    }
  },
  // 边界属性设置
  boundaryOptions: {
    color: "#FFFF00",
    fillOpacity: 0,
    weight: 1
  }
}
