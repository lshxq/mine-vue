import Vue from "vue";

import DataTable from "./data-table/data-table-index.vue";
Vue.component("data-table", DataTable);

import ApplyCancelButton from "./apply-cancel-button.vue";
Vue.component("apply-cancel", ApplyCancelButton);

import NumberInput from "./number-input.vue";
Vue.component("number-input", NumberInput);

import Radio from "./radio.vue";
Vue.component("radio", Radio);

import LinkStyle from "./link-style.vue";
Vue.component("link-style", LinkStyle);

import SingleSelect from "./single-select.vue";
Vue.component("single-select", SingleSelect);

import LabelValue from "./label-value-group.vue";
Vue.component("labelvalue", LabelValue);

import Stable from "./data-table/stable.vue";
Vue.component("stable", Stable);

import EchartWrapper from "./echart-wrapper/echart-wrapper.vue";
Vue.component("Echart", EchartWrapper);

import ImageUploader from "./image-uploader.vue";
Vue.component("ImageUploader", ImageUploader);
