import _ from "lodash";
import utils from "@/utils/utils.js";

export default {
  props: {
    api: String,
    id: null,
  },
  data() {
    return {
      original: {},
      modified: {},
    };
  },
  computed: {
    editMode() {
      const { id } = this;
      if (id || id === 0) {
        return true
      }
      return false
    },
    modelDiff() {
      const { original, modified } = this;
      const data = {};
      for (const key in modified) {
        if (original[key] != modified[key]) {
          data[key] = modified[key];
        }
      }
      return data;
    },
    postData() {
      return this.editMode ? this.modelDiff : this.modified;
    },
    postMethod() {
      return this.editMode ? "PATCH" : "POST";
    },
    postApi() {
      const that = this;
      const { id, api } = that;
      return that.editMode ? `${api}/${id}` : api;
    },
  },
  mounted() {
    const that = this;
    const { id, api } = that;
    if (that.editMode) {
      // 加载数据
      utils
        .ajax({
          api: `${api}/${id}`,
          method: "GET",
        })
        .then((rv) => {
          const model = that.dataLoaded(_.get(rv, "data"));
          that.original = model;
          that.modified = JSON.parse(JSON.stringify(model));
        });
    }
  },
  methods: {
    cancel() {
      console.log("default cancel implementation");
      if (window.history.length <= 1) {
        this.$router.push({ path: "/" });
        return false;
      } else {
        this.$router.go(-1);
      }
    },
    dataLoaded(data) {
      return data;
    },
    beforePost(data) {
      return data;
    },
    submitted(rv) {
      console.log(rv, "default submitted implementation.");
    },
    serverError(ex) {
      console.log(ex, "default serverError implementation.");
    },
    apply() {
      const that = this;
      that.$refs.formRef.validate((valid) => {
        if (valid) {
          utils
            .ajax({
              api: that.postApi,
              data: that.beforePost(that.postData),
              method: that.postMethod,
            })
            .then((rv) => {
              that.submitted(rv.data);
            })
            .catch((ex) => {
              that.serverError(ex);
            });
        }
      });
    },
  },
};
