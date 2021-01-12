<template>
  <div class="content">
    <!--    搜索栏和新增-->
    <div class="search">
      <el-row>
        <h3 class="searchName">筛选：</h3>
        <el-input v-model="searchData" class="searchBox">
        </el-input>
      </el-row>
      <hr>
      <el-row>
        <el-button round @click="dialogFormVisible = true">添加新类目</el-button>
      </el-row>
      <el-dialog title="添加新类目" :visible.sync="dialogFormVisible">
        <el-form :model="dialogForm">
          <el-form-item label="类目名称" :label-width="formLabelWidth">
            <el-input v-model="dialogForm.category_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类目类型" :label-width="formLabelWidth">
            <el-input v-model="dialogForm.category_type" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--    主内容页面div-->
    <div class="page">
      <!--      表格展示类目内容-->
      <el-table class="table"
                :data="tableData"
                border>
        <el-table-column
          prop="category_id"
          label="类目id"
          width="150">
        </el-table-column>
        <el-table-column
          prop="category_name"
          label="类目名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="category_type"
          label="类目类型"
          width="240">
        </el-table-column>
        <el-table-column
          label="操作"
          width="300">
          <template slot-scope="scope">
            <el-button type="text" size="normal" @click="showUpdateDialogForm(scope.row)">编辑</el-button>
            <el-button type="text" size="normal" @click="showDeleteDialog(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--      点击编辑的弹窗-->
      <el-dialog title="修改类目" :visible.sync="updateDialogFormVisible">
        <el-form :model="updateDialogForm">
          <el-form-item label="类目名称" :label-width="formLabelWidth">
            <el-input v-model="updateDialogForm.category_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类目类型" :label-width="formLabelWidth">
            <el-input v-model="updateDialogForm.category_type" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmUpdate">确 定</el-button>
        </div>
      </el-dialog>

      <!--      点击删除的弹窗-->
      <el-dialog
        title="提示"
        :visible.sync="deleteDialogVisible"
        width="30%">
        <span>你确定要删除该类目吗？</span>
        <span slot="footer" class="dialog-footer">
                <el-button @click="deleteDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmDelete">确 定</el-button>
              </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
export default {
  name: "UpdateCategory",
  data() {
    return {
      //弹窗表单宽度
      formLabelWidth: '120px',
      //搜索栏数据
      searchData: null,
      //新增类目的弹窗可见
      dialogFormVisible: false,
      //新增类目的弹窗表单的数据绑定
      dialogForm: {
        category_name: '',
        category_type: null
      },
      //  类目的表格数据
      tableData: [
        {
          category_id: null,
          category_name: '',
          category_type: null
        }
      ],
      //修改商品的表单可见
      updateDialogFormVisible: false,
      //删除按钮的弹窗可见
      deleteDialogVisible: false,
      //修改商品的表单数据绑定
      updateDialogForm: {
        category_id: null,
        category_name: '',
        category_type: null
      },
      deletedCategory_id: null

    }
  },
  methods: {
    showUpdateDialogForm: function (row) {
      if (row.category_id !== null) {
        this.updateDialogFormVisible = true;
        this.updateDialogForm.category_id = row.category_id;
        this.updateDialogForm.category_name = row.category_name;
        this.updateDialogForm.category_type = row.category_type;
      }
    },
    confirmUpdate: async function () {
      if (this.updateDialogForm.category_name !== '' && this.updateDialogForm.category_type !== null) {
        const {data: res} = await this.$http.post("category/add", this.updateDialogForm);
        if (res.meta.status !== 200) {
          //请求失败
          this.$message({
            message: res.meta.msg,
            type: "error"
          });
          this.updateDialogFormVisible = false;
        } else {
          //请求成功
          this.$message({
            message: res.meta.msg,
            type: "success"
          });
        }
      }
    },
    getData: async function () {
      const {data: res} = await this.$http.get("category/list");
      if (res.meta.status !== 200) {
        //请求失败
        this.$message({
          message: res.meta.msg,
          type: "error"
        });
      } else {
        //请求成功,将请求的数据放入表格
        this.tableData = res.data;
      }
    },
    showDeleteDialog: function (row) {
      this.deletedCategory_id = row.category_id;
      if (this.deletedCategory_id !== null)
        this.deleteDialogVisible = true;
    },
    confirmDelete: async function () {
      const {data: res} = await this.$http.get("category/delete?category_id=" + this.deletedCategory_id);
      if (res.meta.status !== 200) {
        //请求失败
        this.$message({
          message: res.meta.msg,
          type: "error"
        });
      } else {
        this.$message({
          message: res.meta.msg,
          type: "success"
        });
        this.deleteDialogVisible = false;
      }

    }
  },
  created: function () {
    this.getData();
  }
}
</script>

<style scoped>
.content {
  height: 100%;
  width: 100%;
}

.search {
  width: 100%;
  padding: 40px 0 10px 40px;
}


.searchBox {
  display: table-cell;
  vertical-align: middle;
  width: 300px;
}

.searchName {
  display: table-cell;
  vertical-align: middle;
}

.table {
  height: 100%;
  margin-left: 30px;
}

.page {
  height: 100%;
  width: 100%;
}
</style>
