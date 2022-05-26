<template>
  <div id="card">
    <el-dialog :title="isadd?'添加商品':'修改商品'"
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="handleClose">
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="姓名"
                      prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="时间"
                      required>
          <el-form-item prop="date">
            <el-date-picker type="date"
                            placeholder="选择日期"
                            v-model="ruleForm.date"
                            value-format="yyyy-MM-dd"
                            style="width: 100%;">
            </el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="地址"
                      prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item label="爱好"
                      prop="likes">
          <el-input v-model="ruleForm.likes"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary"
                   @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name,
  data () {
    return {
      dialogVisible: true,
      ruleForm: {
        name: '',
        date: '',
        address: '',
        likes: ''
      },
      rules: {
        name: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 5,
          message: '长度在 2 到 5 个字符',
          trigger: 'blur'
        }
        ],
        date: [{
          //表单验证时需要去除类型检测
          // type: 'date',
          required: true,
          message: '请选择日期',
          trigger: 'change'
        }],
        address: [{
          required: true,
          message: '请输入地址',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 50,
          message: '长度在 3 到 50 个字符',
          trigger: 'blur'
        }
        ],
        likes: [{
          required: true,
          message: '请输入爱好',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 50,
          message: '长度在 2 到 50 个字符',
          trigger: 'blur'
        }
        ]
      },

    }
  },
  //点击编辑时将数据给入
  created () {
    if (Object.keys(this.formData).length > 0 && !this.isadd) {
      this.ruleForm = { ...this.formData }
    } else {
      this.ruleForm = {}
    }
  },
  methods: {
    //取消
    close () {
      this.$emit('closeDialog')
    },
    handleClose () {
      this.$emit('closeDialog')
    },
    //添加数据 表单预验证
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('submitform', {
            isadd: this.isadd,
            formdata: this.ruleForm//填写的数据
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    }
  }
  ,
  props: {
    isadd: {
      type: Boolean
    },
    formData: {
      type: Object
    }
  }
}
</script>

<style lang='less' scoped>
</style>