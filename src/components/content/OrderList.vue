<template>
  <div class="content">
    <div class="search">
      <h3 class="searchName">筛选：</h3>
      <el-input v-model="searchData" class="searchBox">
      </el-input>
    </div>
    <div class="page">
      <el-table class="table"
                :data="tableData"
                border>
        <el-table-column
          prop="buyer_name"
          label="买家姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="buyer_phone"
          label="买家电话"
          width="180">
        </el-table-column>
        <el-table-column
          prop="buyer_address"
          label="买家地址"
          width="360">
        </el-table-column>
        <el-table-column
          prop="order_amount"
          label="订单金额"
          width="150">
        </el-table-column>
        <el-table-column
          prop="order_status"
          label="订单状态"
          width="120">
        </el-table-column>
        <el-table-column
          prop="pay_status"
          label="支付状态"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" size="normal" @click="confirmUpdateOrder(scope.row)">完成订单</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--      点击完成订单的弹窗-->
      <el-dialog
        title="完成订单"
        :visible.sync="updateDialogVisible"
        width="30%">
        <span>你确定完成该订单吗？</span>
        <span slot="footer" class="dialog-footer">
                <el-button @click="updateDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="completeOrder(scope.row)">确 定</el-button>
              </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderList",
  data() {
    return {
      message: "Hello Vue!",
      searchData: "",
      tableData: [
        {
          "order_id": "",
          "buyer_name": "",
          "buyer_phone": "",
          "buyer_address": "",
          "buyer_openid": "",
          "order_amount": null,
          "order_status": null,
          "pay_status": null
        }
      ],
      updateDialogVisible: false,
      updateData: null
    }
  },
  methods: {
    getData: async function () {
      const {data: res} = await this.$http.get("order/list");
      console.log(res);
      if(res.meta.status!==200){
        //请求失败
        this.$message({
          message:res.meta.msg,
          type:"error"
        });
      }else {
        //请求成功,将请求的数据放入表格
        this.tableData=res.data;
      }
    },
    //完成订单，订单状态变为1，
    completeOrder: async function () {
      this.tableData.order_status=1;
      const {data: res} = await this.$http.post("order/update",this.tableData);
      if(res.meta.status!==200){
        this.$message({
          message:res.meta.msg,
          type:"error"
        });
      }else{
        this.$message({
          message:res.meta.msg,
          type:"success"
        });
      }
      this.updateDialogVisible = false;
      await this.getData();
    },
    //弹出对话框，并保存数据
    confirmUpdateOrder:function (row){
      if(row.order_id!==""){
        this.updateData=row;
        console.log(row);
        this.updateDialogVisible=true;
      }
    }
  },
  //创建时执行，获取数据
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
  padding: 40px;
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
