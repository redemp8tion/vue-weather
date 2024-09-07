<template>
  <div class="main">
    <div class="dashboard">
      <el-row>
        <el-col :xs="16" :sm="12" :md="8" :lg="6" :xl="8">
          <div class="grid-content left">
            <div class="search">
              <Search></Search>
            </div>
            <div class="weather-img">
              <img src="../assets/10d.png" alt="" />
            </div>
            <div class="daily-message">
              <div class="temp">
                <span class="temperature">12</span>
                <span class="degree">℃</span>
              </div>
              <div class="time">
                <span class="week">Monday, </span>
                <span class="time-now">16:00</span>
              </div>
            </div>
            <div class="weather-message">
              <div class="weather-flex">
                <img src="../assets/10d.png" alt="" />
                Mostly Cloudy
              </div>
              <div class="weather-flex">
                <img src="../assets/10d.png" alt="" />
                Rain - 30%
              </div>
            </div>
            <div class="city">
              <span class="name">New York, NY, USA</span>
            </div>
          </div>
        </el-col>
        <el-col :xs="8" :sm="12" :md="16" :lg="18" :xl="16">
          <div class="grid-content right">
            <weatherCard></weatherCard>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.el-col {
  border-radius: 20px;
}
.main {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #d6d7da;
  .dashboard {
    position: absolute;
    width: 80%;
    height: 90%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: #f6f6f8;
    border-radius: 20px;
    .grid-content {
      min-height: 90vh;
      border-radius: 20px;
    }
    .left {
      background-color: #fff;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      .search {
        width: 100%;
        height: 50px;
        padding: 5px;
      }
      .weather-img {
        width: 250px;
        height: 250px;
        img {
          width: 100%;
          height: 100%;
          image-rendering: auto;
        }
      }
      .daily-message {
        width: 80%;
        margin-left: 20px;
        border-bottom: 1px #e7e6e6 solid;
        .temp {
          position: relative;
          margin-left: 10px;
          height: 80px;
          .temperature {
            font-size: 50px;
            font-weight: 320;
          }
          .degree {
            position: absolute;
            top: 0;
            margin-top: 2px;
            font-size: 30px;
            font-weight: 320;
          }
        }
        .time {
          height: 20px;
          margin-left: 10px;
          margin-bottom: 30px;
          .week {
            font-size: 18px;
            color: #000;
          }
          .time-now {
            font-size: 16px;
            color: #ccc;
          }
        }
      }
      .weather-message {
        margin-left: 20px;
        margin-top: 10px;
        width: 80%;
        height: 25px;
        font-size: 14px;
        img {
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }
        .weather-flex {
          display: flex;
          align-items: center;
          justify-content: start;
          margin-bottom: 10px;
        }
      }
      .city{
        width: 80%;
        height: 65px;
        margin-top: 60px;
        margin-left: 30px;
        border-radius: 10px;
        background: url(../assets/city.jpg) no-repeat center;
        display: flex;
        justify-content: center;
        align-items: center;
        .name{
          color:#fff;
        }
      }
    }
    .right {
      height: 100%;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      background-color: #f6f6f8;
    }
  }
}
</style>
