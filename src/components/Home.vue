<template>
  <div class="container">
    <!--    顶部-->
    <div class="top">
      <img class="icon" src="../assets/head.png" alt="店铺图标">
      <h1 class="title">超好吃料理店后台管理系统</h1>
    </div>
    <div class="main_container">
      <!--    左侧菜单-->
      <div class="menu">
        <el-menu default-active="1-1" class="el-menu" @open="handleOpen" @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="goTo('/Home/OrderList')">全部订单</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-shop"></i>
              <span>店铺管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="goTo('/Home/UpdateSellerInfo')">店铺信息管理</el-menu-item>
              <el-menu-item index="2-2" @click="goTo('/Home/UpdateProduct')">商品管理</el-menu-item>
              <el-menu-item index="2-3" @click="goTo('/Home/UpdateCategory')">类目管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div id="main_body">
        <router-view></router-view>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: "Home",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goTo(path){
      this.$router.replace(path);
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}

.top {
  height: 150px;
  width: 100%;
  background-color: #f6f6f6;
}

.icon {
  height: 130px;
  width: 130px;
  display: inline;
  background-color: aliceblue;
  position: absolute;
  left: 20px;
  top: 10px;
}

.title {
  color: #303133;
  position: absolute;
  left: 180px;
  top: 30px;
}

.menu {
  height: 100%;
  width: 200px;
  position: absolute;
  left: 0;
}

.el-menu {
  height: 100%;
}

.main_container {
  height: 100%;
  width: 100%;
}

#main_body {
  height: 80%;
  width: 80%;
  position: absolute;
  left: 200px;
}

</style>
