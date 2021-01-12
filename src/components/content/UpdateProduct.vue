<template>
  <div class="content">
    <div class="search">
      <el-row>
        <h3 class="searchName">筛选：</h3>
        <el-input v-model="searchData" class="searchBox">
        </el-input>
      </el-row>
      <hr>
      <el-row>
        <el-button round @click="addNewProduct">添加新商品</el-button>
      </el-row>
      <el-dialog title="添加新商品" :visible.sync="dialogFormVisible">
        <el-form :model="dialogForm">
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input v-model="dialogForm.product_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品单价" :label-width="formLabelWidth">
            <el-input v-model="dialogForm.product_price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品库存" :label-width="formLabelWidth">
            <el-input v-model="dialogForm.product_stock" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品描述" :label-width="formLabelWidth">
            <el-input v-model="dialogForm.product_description" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品图标URL" :label-width="formLabelWidth">
            <el-input v-model="dialogForm.product_icon" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="商品状态" :label-width="formLabelWidth">
            <el-select v-model="dialogForm.product_status" placeholder="请选择商品状态">
              <el-option label="正常" value="0"></el-option>
              <el-option label="下架" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类目" :label-width="formLabelWidth">
            <el-select v-model="dialogForm.category_type" placeholder="请选择商品类目">
              <el-option v-for="category of categories" :key="category.category_type" :label="category.category_name"
                         :value="category.category_type"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmitNewProduct">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--    主页面-->
    <div class="page">
      <el-table class="table"
                :data="tableData"
                border>
        <el-table-column
          prop="product_id"
          label="商品id"
          width="120">
        </el-table-column>
        <el-table-column
          prop="product_name"
          label="商品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="product_price"
          label="商品价格"
          width="80">
        </el-table-column>
        <el-table-column
          prop="product_stock"
          label="商品库存"
          width="80">
        </el-table-column>
        <el-table-column
          prop="product_description"
          label="商品描述"
          width="240">
        </el-table-column>
        <el-table-column
          prop="product_icon"
          label="图标url"
          width="200">
        </el-table-column>
        <el-table-column
          prop="product_status"
          label="商品状态"
          width="120">
        </el-table-column>
        <el-table-column
          prop="category_id"
          label="类目id"
          width="120">
        </el-table-column>
        <el-table-column
          prop="category_name"
          label="类目名称"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" size="normal" @click="updateProduct(scope.row)">编辑</el-button>
            <el-button type="text" size="normal" @click="deleteProduct(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    点击编辑的弹窗-->
    <el-dialog title="修改商品" :visible.sync="updateDialogFormVisible">
      <el-form :model="updateDialogForm">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="updateDialogForm.product_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品单价" :label-width="formLabelWidth">
          <el-input v-model="updateDialogForm.product_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品库存" :label-width="formLabelWidth">
          <el-input v-model="updateDialogForm.product_stock" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <el-input v-model="updateDialogForm.product_description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品图标URL" :label-width="formLabelWidth">
          <el-input v-model="updateDialogForm.product_icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品状态" :label-width="formLabelWidth">
          <el-select v-model="updateDialogForm.product_status" placeholder="请选择商品状态">
            <el-option label="正常" value="0"></el-option>
            <el-option label="下架" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类目" :label-width="formLabelWidth">
          <el-select v-model="updateDialogForm.category_type" placeholder="请选择商品类目">
            <el-option v-for="category of categories" :key="category.category_type" :label="category.category_name"
                       :value="category.category_type"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmUpdateProduct">确 定</el-button>
      </div>
    </el-dialog>
    <!--    点击删除的弹窗-->
    <el-dialog title="确认删除？"
               :visible.sync="deleteDialogVisible"
               width="30%"
               :before-close="confirmDelete">
      <span>确认删除当前商品吗？</span>
      <span slot="footer" class="dialog-footer">
                <el-button @click="deleteDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteDialogVisible = false">确 定</el-button>
              </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UpdateProduct",
  data() {
    return {
      message: "Hello Vue!",
      searchData: "",
      tableData: [
        {
          "product_id": "",
          "product_name": "",
          "product_price": null,
          "product_stock": null,
          "product_description": "",
          "product_icon": "",
          "product_status": null,
          "category_id": "",
          "category_name": ""
        }
      ],
      //添加商品的表单可见
      dialogFormVisible: false,
      //添加商品的数据绑定
      dialogForm: {
        product_name: '',
        product_price: '',
        product_stock: '',
        product_description: '',
        product_icon: '',
        product_status: [],
        category_type: null
      },
      formLabelWidth: '120px',
      // 类目信息
      categories: [
        {
          "category_id": null,
          "category_name": "",
          "category_type": null
        }
      ],
      //删除按钮的弹窗可见
      deleteDialogVisible: false,
      //修改商品的表单可见
      updateDialogFormVisible: false,
      updateDialogForm: {
        product_id: '',
        product_name: '',
        product_price: '',
        product_stock: '',
        product_description: '',
        product_icon: '',
        product_status: null,
        category_type: null
      },
      rowData: null
    }
  },
  methods: {
    addNewProduct: function () {
      this.dialogFormVisible = true;
    },
    onSubmitNewProduct: async function () {
      if (this.dialogForm.product_name !== "") {
        this.dialogFormVisible = false;
        const {data: res} = await this.$http.post("product/add", this.dialogForm);
        if (res.meta.status !== 200) {
          //请求失败
          this.$message({
            message: res.meta.msg,
            type: "error"
          });
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
      const {data: res} = await this.$http.get("product/list");
      console.log(res);
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
      const {data: res_c} = await this.$http.get("category/list");
      console.log(res_c);
      if (res_c.meta.status !== 200) {
        //请求失败
        this.$message({
          message: res_c.meta.msg,
          type: "error"
        });
      } else {
        //请求成功,将请求的数据放入类目列表数组
        this.categories = res_c.data;
      }
    },
    updateProduct: function (row) {
      this.rowData = row;
      this.updateDialogForm = row;
      if (this.rowData.product_id !== "") {
        this.updateDialogFormVisible = true;
      }
    },
    confirmUpdateProduct: async function () {
      if (this.updateDialogForm.product_id !== "") {
        const {data: res} = await this.$http.post("product/update", this.updateDialogForm);
        if (res.meta.status !== 200) {
          this.$message({
            message: res.meta.message,
            type: "error"
          });
        } else {
          this.$message({
            message: res.meta.message,
            type: "success"
          });
          this.updateDialogFormVisible = false;
        }

      }
    },
    deleteProduct: function (row) {
      this.rowData = row;
      if (this.rowData.product_id !== "") {
        this.deleteDialogVisible = true;
      }
    },
    confirmDelete: function () {
      this.$confirm('确认删除？')
        .then(
          async () => {
            const {data: res} = await this.$http.get("product/delete?product_id=" + this.rowData.product_id);
            if (res.meta.status !== 204) {
              this.$message({
                message: res.meta.msg,
                type: "error"
              });
            } else {
              this.$message({
                message: res.meta.msg,
                type: "success"
              });
            }
          }
        )
        .catch(_ => {
        });
    },
    goTo(path) {
      this.$router.replace(path);
    }
  },
  //创建时执行,获取数据
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

.page {
  height: 100%;
  width: 100%;
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
  width: 100%;
  margin-left: 30px;
}
</style>
