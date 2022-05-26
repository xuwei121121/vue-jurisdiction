<template>
  <div class="aside">
    <el-menu router
             default-active="$route.path"
             class="el-menu-vertical-demo"
             background-color="#333"
             text-color="#fff"
             active-text-color="#ffd04b"
             :collapse-transition="false"
             :collapse='isCollapse'
             :style="changewidth">
      <AsideLeft :navMenus="slidemenus"></AsideLeft>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AsideLeft from '../components/AsideLeft.vue'
export default {
  name,
  data () {
    return {
      isCollapse: false
    }
  },
  mounted () {
    this.$bus.$on('collapseaside', (isCollapseHeader) => {
      this.isCollapse = isCollapseHeader
    })
  },
  components: {
    AsideLeft
  },
  computed: {
    ...mapState(['slidemenus']),
    changewidth () {
      return this.isCollapse ? 'width:50px' : 'width:200px'
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo {
  border: 0;
}

/* @open="handleOpen"
             @close="handleClose" */
</style>
