<template lang="pug">
.image-uploader-main
  el-upload.h200(
    action="",
    drag="",
    :auto-upload="false",
    :show-file-list="false",
    :on-change="changeUpload"
  )
    i.el-icon-upload
    .el-upload__text 点击上传
    .el-upload__tip 支持绝大多数图片格式，单张图片最大支持5MB
    .mb10

  el-dialog(title="图片剪裁", :visible.sync="dialogVisible", append-to-body)
    .cropper-content
      .cropper(style="text-align: center")
        vue-cropper(
          ref="cropper",
          :img="image",
          :auto-crop="true",
          :fixed-box="fixedBox",
          :autoCropWidth="autoCropWidth",
          :autoCropHeight="autoCropHeight"
        )
    .dialog-footer(slot="footer")
      apply-cancel(
        @apply="doUpload",
        @cancel="dialogVisible = false",
        :loading="loading"
      )
</template>

<script>
import _ from 'lodash'
import utils from '@/utils/utils.js'

export default {
  props: {
    size: {
      type: Object,
      default() {
        return false
      }
    },
    func: String,
    id: null,
  },
  data() {
    return {
      dialogVisible: false,
      fileinfo: false,
      image: '',
      // 防止重复提交
      loading: false
    }
  },
  computed: {
    fixedBox() {
      const { size } = this
      if (size && size.width && size.height) {
        return true
      }
      return false
    },
    autoCropWidth() {
      return _.get(this, 'size.width')
    },
    autoCropHeight() {
      return _.get(this, 'size.height')
    }
  },
  methods: {
    // 上传按钮   限制图片大小
    changeUpload(file, fileList) {
      const that = this
      console.log(fileList)
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        that.$message.error('上传文件大小不能超过 5MB!')
        return false
      }
      that.fileinfo = file
      const reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = () => {
        that.image = reader.result
        that.dialogVisible = true
      }
    },
    doUpload() {
      const that = this
      that.$refs.cropper.getCropBlob((data) => {
        const {
          func,
          id
        } = that
        that.loading = true
        const formData = new FormData()
        formData.append('file', data)
        if (func) {
          formData.append('func', func)
        }
        formData.append('id', id || `${new Date().getTime()}.jpg`)

        utils.ajax({
          api: 'system/upload',
          method: 'POST',
          data: formData,
          onUploadProgress: e => {
            console.log(e)
          }
        }).then(resp => {
          that.$emit("uploaded", _.get(resp, 'data'))
          that.dialogVisible = false
        }).finally(() => {
          that.loading = false
        })
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.cropper-content
  .cropper
    width: auto
    height: 400px
</style>