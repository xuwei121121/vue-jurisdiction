<template>
  <div class="user">
    <Card v-if="isshow"
          @closeDialog='close'
          :isadd='isadd'
          @submitform="submitdialog"
          :formData='formData'></Card>
    <div class="user1">
      <topBar @addgoods="addGoods"
              @serach='Serach'></topBar>
      <template class="list">
        <el-table :data="tableData"
                  style="width: 100%"
                  v-loading='loading'>
          <el-table-column type="index"
                           label="序号"
                           width="150">
          </el-table-column>
          <el-table-column prop="date"
                           label="日期"
                           width="120">
          </el-table-column>
          <el-table-column prop="name"
                           label="姓名"
                           width="120">
          </el-table-column>
          <el-table-column prop="address"
                           label="地址"
                           width="120">
          </el-table-column>
          <el-table-column prop="likes"
                           label="爱好"
                           width="300">
          </el-table-column>
          <el-table-column label="操作"
                           align="center">
            <template v-slot="scope">
              <el-button type="primary"
                         size="mini"
                         @click="handleEdit(scope.$index, scope.row)"
                         icon="el-icon-edit"></el-button>
              <el-button size="mini"
                         type="danger"
                         @click="handleDelete(scope.$index, scope.row)"
                         icon="el-icon-delete">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="page.current"
                       :page-sizes="[1, 5, 10, 20]"
                       :page-size="page.size"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </template>
    </div>
  </div>
</template>

<script>
import Card from '../components/main/Card.vue'
import topBar from '../components/main/topBar.vue'
export default {
  name,
  components: {
    topBar,
    Card
  },
  data () {
    return {
      isadd: true,
      isshow: false,
      loading: false,
      total: 0,
      page: {
        size: 10,
        current: 1
      },
      tableData: [],
      formData: {}
    }
  },
  methods: {
    /* 分页 */
    handleSizeChange (val) {
      this.page.size = val
      this.getlist(this.page.current)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.page.current = val
      this.getlist()
    },
    //数据初始化
    initData () {
      this.getlist(),
        this.getData()
    },
    //获取list数据
    getlist () {
      this.loading = true
      this.$Api.getList({
        current: this.page.current
      }).then(res => {
        console.log(res);
        this.tableData = res.data
        this.loading = false
      })
    },
    //获取data数据
    getData () {
      this.$Api.getTotal().then(res => {
        // console.log(res);
        this.total = res.data
      })
    },
    //添加商品
    addGoods () {
      this.isshow = true
      this.isadd = true
    },
    //取消对话框
    close () {
      this.isshow = false
    },
    //编辑商品
    handleEdit (index, row) {
      this.isshow = true
      this.isadd = false
      this.formData = row;
    },
    //搜索区域
    Serach (value) {
      if (value == '') {
        this.$message({
          message: '搜索内容不能为空',
          type: 'error'
        });
      } else {
        this.$Api.getListByValue({ value }).then(res => {
          console.log(res);
          this.tableData = res.data.list
        })
      }
    },
    //添加商品后提交
    submitdialog (info) {
      //判断是添加还是编辑
      if (info.isadd) {
        this.$Api.addList({ rowData: info.formdata }).then(res => {
          console.log(res);
          this.initData()
          this.isshow = false
          //添加成功提示
          this.$message({
            message: '恭喜你，成功添加一条消息',
            type: 'success'
          });
        })
      } else {
        this.$Api.updateList({ rowData: info.formdata }).then(res => {
          console.log(res);
          this.initData()
          this.isshow = false
          //修改成功提示
          this.$message({
            message: '恭喜你，成功修改一条消息',
            type: 'success'
          });
        })
      }

    },
    //删除商品
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //删除
        this.$Api.deleteList({ id: row.id }).then(res => {
          if (res.status == '200') {
            //删除后重新加载数据
            this.initData()
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  mounted () {
    this.initData()
  },
}
</script>

<style  scoped>
.user {
  line-height: 0px;
}
</style>