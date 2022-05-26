<template>
  <div class="topbar">
    <div class="container">
      <el-input placeholder="请输入内容"
                v-model.trim="input"
                clearable>
        <template slot="append"><span @click="serach">搜索</span></template>
      </el-input>
      <el-button type="primary"
                 @click="addGoods"
                 v-permission="{action:'add'}">添加商品</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: ''
    }
  },
  methods: {
    addGoods () {
      this.$emit('addgoods')
    },
    serach () {
      this.$emit('serach', this.input)
    }
  }
}
</script>
<style lang='less' scoped>
.topbar {
  line-height: 0px;
  float: left;
  .el-input {
    width: 300px;
    span {
      cursor: pointer;
    }
  }
  .el-button {
    margin-left: 15px;
  }
}
</style>