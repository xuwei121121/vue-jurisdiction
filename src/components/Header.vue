<template>
  <div class="header">
    <div class="header-left">
      <div class="header-left__logo">
        <img src="@/assets/logo.png"
             alt="">
      </div>
      <div class="header-left__title">后台管理</div>
      <i class="el-icon-s-fold icon"
         @click="collapse"></i>
    </div>
    <!-- 导航菜单 -->
    <div class="header-right">
      <el-menu :default-active="user.navBar.active"
               class="el-menu-demo"
               mode="horizontal"
               @select="handleSelect"
               background-color="#333"
               text-color="#fff"
               active-text-color="#ffd04b">
        <el-menu-item :index="index+''"
                      v-for="(item,index) in user.navBar.list"
                      :key="index">{{item.name}}</el-menu-item>

        <el-submenu index="100">
          <template slot="title">{{user.username}}</template>
          <el-menu-item index="100">设置</el-menu-item>
          <el-menu-item index="101">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
// import LoginVue from '@/views/Login.vue';
import { mapState, mapMutations } from 'vuex'
export default {
  name,
  data () {
    return {
      isCollapseHeader: false
    };
  },
  methods: {
    //折叠区域
    collapse () {
      this.isCollapseHeader = !this.isCollapseHeader
      this.$bus.$emit('collapseaside', this.isCollapseHeader) //中央总线
    },
    ...mapMutations(['getslideMenus']),
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
      if (this.user.navBar) {
        this.user.navBar.active = key
        let item = this.user.navBar.list[this.user.navBar.active]
        if (item) {
          //与侧边栏联动
          this.getslideMenus(item.leftMenus)
          //刷新不消失
          //顶部切换路由跳转
          this.$router.push({
            name: item.leftMenus[0].name
          })
          if (key === '0') {
            this.$router.push({
              name: 'welcome'
            })
          }
        }
      }
      //退出功能实现
      if (key == '101') {
        this.$router.push('/login')
        window.sessionStorage.removeItem('token')
        window.sessionStorage.removeItem('rightlist')
      }
    }
  },
  //挂载刷新不消失
  mounted () {
    //防止刷新回到首页
    let r = JSON.parse(window.localStorage.getItem('navactive')) || '0'
    if (this.user.navBar) {
      this.user.navBar.active = r
    }

    if (this.user.navBar) {
      let item = this.user.navBar.list[this.user.navBar.active]
      if (item) {
        this.getslideMenus(item.leftMenus)
      }

    }
  },
  computed: {
    ...mapState(['user'])
  },
  //设置监听
  watch: {
    $route () {
      if (this.user.navBar) {
        window.localStorage.setItem('navactive', JSON.stringify(this.user.navBar.active))
        let item = this.user.navBar.list[this.user.navBar.active]
        this.getslideMenus(item.leftMenus)
      }
    }
  }
}
</script>

<style lang="less" scoped>
//隐藏箭头
.header-left__logo {
  display: none;
}
.el-menu--collapse .el-submenu_title .el-submenu_icon-arrow {
  display: none;
}
.header {
  width: 100%;
  height: 100%;
  background-color: #333;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 2px 5px #333;

  &-left {
    height: 100%;
    display: flex;
    align-items: center;

    .icon {
      color: #fff;
      margin-left: 30px;
    }

    &__logo {
      width: 80px;
      height: 100%;
      padding: 5px;

      & > img {
        width: 100%;
        height: 100%;
      }
    }

    &__title {
      font-size: 20px;
      color: #fff;
      text-shadow: 10px 10px rgba(25, 255, 255, 0.3);
    }
  }

  &-right {
    display: flex;
    align-items: center;

    &__info {
      &-name {
        color: #f0ffff;
        font-size: 16px;
        margin-right: 15px;
      }
    }
  }
}
</style>