<template>
  <div class="home">
    <el-container class="homes">
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside :style="changewidth">
          <Aside></Aside>
        </el-aside>
        <el-main>
          <Main></Main>
          <!-- <button @click="gologin">login</button> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Aside from '../components/Aside.vue'
import Main from '../components/Main.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  name,
  data () {
    return {
      isCollapse: false,
    }
  },
  components: {
    Header,
    Aside,
    Main
  },
  methods: {
    // gologin () {
    //   this.$router.push("/login")
    // },
    ...mapMutations(['addBread']),
    //面包屑
    getbread () {
      // console.log(this.$route);
      var getobj = this.$route.matched.filter(v => v.name)
      let arr = []
      getobj.forEach(v => {
        if (v.name === 'welcome' || v.name === 'home') {
          return
        }
        arr.push({
          name: v.name,
          path: v.path,
          title: v.meta.title
        })
        //解决面包屑有下一级
        this.slidemenus.forEach(item => {
          if (item.children) {
            item.children.filter(i => i.key == v.path).length > 0 ? arr.unshift({ title: item.title }) : arr
          }
        })
      })
      if (arr.length > 0) {
        arr.unshift({
          name: 'home',
          path: '/',
          title: '后台首页'
        })
      }
      this.barn = arr
      // console.log(arr);
      this.addBread(this.barn)
    }
  },
  computed: {
    changewidth () {
      return this.isCollapse ? 'width:49px' : 'width:200px'
    },
    ...mapState(['slidemenus'])
  },
  mounted () {
    this.$bus.$on('collapseaside', (isCollapseq) => {
      this.isCollapse = isCollapseq
    })
    this.getbread()
  },
  //监听路由变化使点击时面包屑区域改变
  watch: {
    $route () {
      this.getbread()
    }
  }
}
</script>

<style scoped>
.homes {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.el-header,
.el-footer {
  background-color: #333;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #333;
  /* color: #333; */
  text-align: center;
  line-height: 200px;
  /* position: absolute;
  top: 60px;
  left: 0;
  bottom: 0; */
}

.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  text-align: center;
  line-height: 160px;
  /* position: absolute;
  top: 60px;
  left: 200px;
  right: 0;
  bottom: 0; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>