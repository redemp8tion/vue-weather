<template>
  <div class="main">
    <div class="dashboard">
      <el-row>
        <el-col :xs="16" :sm="12" :md="8" :lg="6" :xl="8">
          <div class="grid-content left">
            <div class="search">
              <Search></Search>
            </div>
            <div class="weather-img"></div>
            <div class="temp"></div>
            <div class="weather-message"></div>
            <div class="city"></div>
          </div>
        </el-col>
        <el-col :xs="8" :sm="12" :md="16" :lg="18" :xl="16">
          <div class="grid-content right"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.el-col {
  border-radius: 20px;
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #d6d7da;
  .dashboard {
    width: 80%;
    height: 80%;
    background-color: #f6f6f8;
    border-radius: 20px;
    .grid-content {
      min-height: 80vh;
      border-radius: 20px;
    }
    .left{
      background-color: #fff;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      .search{
        width: 100%;
        height: 50px;
        padding: 5px;
      }
    }
    .right{
      background-color: #f6f6f8;
    }
  }
}
</style>
