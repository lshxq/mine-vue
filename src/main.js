import Vue from "vue";
import App from "./app.vue";
import router from "./router";
import ElementUI from "element-ui";
import MavonEditor from "mavon-editor";
import MainMixins from "@/mixins/main-mixins.js";
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)

import "element-ui/lib/theme-chalk/index.css";
import "@/assets/main.sass";
import "@/assets/override.sass";
import "./components/global-components.js";
import "mavon-editor/dist/css/index.css";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(MavonEditor);

Vue.mixin(MainMixins);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

