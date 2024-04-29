<template>
  <el-config-provider :locale="locale">
    <router-view/>
  </el-config-provider>
</template>

<script lang="ts">
import {useRoute, useRouter} from "vue-router";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

export default defineComponent({
  name: 'App',
  setup() {
    let route = useRoute()
    let router = useRouter()
    let locale = zhCn

    return {
      route,
      router,
      locale
    }
  }
})
</script>
