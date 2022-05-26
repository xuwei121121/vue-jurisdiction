<template>
  <div class="navMenu">
    <label v-for="(navMenu,index) in navMenus"
           :key="index">

      <!-- 多级导航 -->
      <el-submenu :index="navMenu.key"
                  v-if="navMenu.children"
                  :style="$route.path===navMenu.key?'color:#ffd04b':''">
        <template slot="title">
          <i :class="navMenu.icon"
             :style="$route.path===navMenu.key?'color:#ffd04b':''"></i>
          <span>{{navMenu.title}}</span>
        </template>
        <!-- 递归组件 -->
        <nav-menu :navMenus="navMenu.children"></nav-menu>
      </el-submenu>
      <!-- 一级导航 -->
      <el-menu-item :index="navMenu.key"
                    v-else
                    :style="$route.path===navMenu.key?'color:#ffd04b':''">
        <i :class="navMenu.icon"
           :style="$route.path===navMenu.key?'color:#ffd04b':''"></i>
        <span slot="title">{{navMenu.title}}</span>
      </el-menu-item>
    </label>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  props: ['navMenus'],
  // mounted () {
  //   this.$bus.$on('collapseaside', (isCollapseHeader) => {
  //     this.isCollapse = isCollapseHeader
  //   })
  // },
}
</script>

<style>
/* .el-submenu__icon-arrow :before {
  display: none;
} */
.el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
  display: none;
}
</style>