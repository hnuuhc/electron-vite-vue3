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
    title: '404'
  },
  data() {
    return {
      img: '/img/404.png',
      text: '小笨蛋，页面跑偏啦～'
    }
  }
}
</script>
