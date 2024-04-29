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
    title: '503'
  },
  data() {
    return {
      img: '/img/503.png',
      text: '服务器正在维护,请耐心等待～'
    }
  }
}
</script>
