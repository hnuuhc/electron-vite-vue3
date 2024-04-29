<template>
  <div class="cor-li center content">
    <el-image :src="img"/>
    <h2>{{ text }}</h2>
  </div>
</template>

<style lang="scss" scoped>
.content {
  transform: translateY(50%);
}
</style>

<script lang="ts">
export default {
  metaInfo: {
    title: '502'
  },
  data() {
    return {
      img: '/img/502.png',
      text: '服务器出现异常,请联系管理员~'
    }
  }
}
</script>
