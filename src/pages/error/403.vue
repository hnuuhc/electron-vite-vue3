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
    title: '403'
  },
  data() {
    return {
      img: '/img/403.png',
      text: '小笨蛋，没有权限访问哦～'
    }
  }
}
</script>
