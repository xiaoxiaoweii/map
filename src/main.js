/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "normalize.css/normalize.css";
import './styles/index.scss'
import * as L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
          iconUrl: icon,
          shadowUrl: iconShadow
      });
L.Marker.prototype.options.icon = DefaultIcon;
import "leaflet/dist/leaflet.css";
import "@/utils/leaflet_utils/leaflet.latlng-graticule.js";
import jQuery from "jQuery";
import { constants } from "@/utils/constant.js";
import axios from 'axios'
Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios
Vue.config.productionTip = false;
Vue.prototype.$constants = constants
Vue.prototype.$L = L;
Vue.prototype.$jQuery = jQuery;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
