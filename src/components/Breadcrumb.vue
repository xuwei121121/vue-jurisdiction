<template>
  <div id="root">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: item.path}"
                          v-for="(item,index) in bread"
                          :key='index'>{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name,
  computed: {
    ...mapState(['bread'])
  }
}
</script>

<style lang='less' scoped>
#root {
  margin: 0 0 20px 0;
}
</style>