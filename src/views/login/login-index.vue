<template lang="pug">
.login-main-panel
  video.login-bg-panel(
    :src="`${publicPath}/login-background.mp4`",
    autoplay="autoplay",
    muted="muted",
    loop="loop"
  )
  .login-form-panel.w400.pad20
    el-form.w0(:model="model", ref="formRef", :rules="rules", label-width="0x")
      .title.h3.mb30.flex-center 系统用户登录
      el-form-item(prop="username")
        el-input(v-model="model.username", placeholder="请输入用户名")
      el-form-item(prop="pass")
        el-input(v-model="model.pass", show-password, placeholder="请输入登录密码")
      el-form-item
        el-button.w0(type="primary", @click="login") 登录
    .desc 为了更好的用户体验，请使用chrome浏览器
</template>

<script>
import utils from "@/utils/utils.js"
import _ from "lodash"

export default {
  created() {
    this.rules = {
      username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
    }
  },
  data() {
    return {
      model: {
        username: "",
        pass: "",
      },
    }
  },
  methods: {
    login() {
      const that = this
      that.$refs.formRef.validate((valid) => {
        if (valid) {
          const { model: data } = that
          utils
            .ajax({
              api: "user/login",
              method: "POST",
              data,
            })
            .then((rv) => {
              const token = _.get(rv, "data.token")
              const user = _.get(rv, "data.user")
              if (token && user) {
                utils.saveSession(token, user)
                that.goto("home")
              } else {
                that.$message.error(_.get(rv, "data.msg"))
              }
            })
            .catch((ex) => {
              console.log(ex)
            })
        }
      })
    },
  },
};
</script>

<style lang="sass" scoped>
.login-main-panel
  position: relative
  right: 0
  top: 0
  bottom: 0
  left: 0
  background-color: #f0f0f0

  &>.login-form-panel
    flex-direction: column
    position: absolute
    right: 20%
    top: 300px
    background-color: rgba(24, 136, 203, .2)
    display: flex
    align-items: center

    &>.desc
      color: #fefefe
      margin-bottom: 30px

    .title
      color: #26dafd
    input
      border: 1px solid #26dafd

.login-bg-panel
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  width: 100%
</style>
