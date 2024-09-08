<template>
  <div class="right-main">
    <div class="tab">
      <div class="today-week">
        <a href="javascript:;" :class="{ active: currentTabIndex === 0 }"
          >Today</a
        >
        <a href="javascript:;" :class="{ active: currentTabIndex === 1 }"
          >Week</a
        >
      </div>
      <div class="temp-button">
        <div class="temp" :class="{ active: currentTempBtnIndex === 0 }" >
          <a href="javascript:;" @click="handleTempBtnClick(0)">℃</a>
        </div>
        <div class="temp" :class="{ active: currentTempBtnIndex === 1 }">
          <a href="javascript:;"  @click="handleTempBtnClick(1)">℉</a>
        </div>
        <div class="avatar">
          <img src="../../assets/avatar.jpg" alt="" />
        </div>
      </div>
    </div>
    <div class="weather-card">
      <div class="card" v-for="item in weeklyForecastData">
        <div class="time">{{ item.weekday }}</div>
        <div class="weather-icon">
          <img :src="`https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${item.icon}.png`" alt="" />
        </div>
        <div class="max-min">
          <span class="max">{{item.maxTemp}}<span v-if="unitIndex === 0">℃</span><span v-else>℉</span></span>
          <span class="min">{{item.minTemp}}<span v-if="unitIndex === 0">℃</span><span v-else>℉</span></span>
        </div>
      </div>
    </div>
    <div class="highlights" v-if="weatherData.dt">
      <div class="title">
        <h1>Today's Highlights</h1>
      </div>
      <div class="highlight-card">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="item">
              <div class="item-box">
                <div class="title">UV Index</div>
                <div class="message">
                  <img src="../../assets/uvIndex.png" alt="" />
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item">
              <div class="item-box">
                <div class="title">Wind Status</div>
                <div class="message">
                  <div class="wind-speed"><span class="speed">{{weatherData.wind.speed}}</span> km/h</div>
                  <div class="wind-deg">
                    <img src="../../assets/wind.png" alt="">
                    <span class="deg">{{ determineWindDirection(weatherData.wind.deg) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item">
              <div class="item-box">
                <div class="title">Sunrise & Sunset</div>
                <div class="message">
                  <div class="rise-down">
                    <img src="../../assets/rise.png" alt="">
                    <div class="time">
                      <span style="font-size: 16px;margin-bottom: 5px;">{{formatTime12h(weatherData.sys.sunrise)}}</span>
                      <span style="font-size: 12px;color: #ccc;">-1m 46s</span>
                    </div>
                  </div>
                  <div class="rise-down">
                    <img src="../../assets/down.png" alt="">
                    <div class="time">
                      <span style="font-size: 16px;margin-bottom: 5px;">{{formatTime12h(weatherData.sys.sunset)}}</span>
                      <span style="font-size: 12px;color: #ccc;">+2m 22s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="item">
              <div class="item-box">
                <div class="title">Humidity</div>
                <div class="message">
                  <div class="content">
                    <span class="data">{{ weatherData.main.humidity }}</span><span style="position: absolute;">%</span>
                  </div>
                  <div class="rate">
                    {{determineHumidityStatus(weatherData.main.humidity)}}
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item">
              <div class="item-box">
                <div class="title">Visibility</div>
                <div class="message">
                  <div class="content"><span class="data">{{(weatherData.visibility/1000).toFixed(1)}}</span> km</div>
                  <div class="rate">{{determineVisibilityStatus(weatherData.visibility/1000)}}</div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item">
              <div class="item-box">
                <div class="title">Air Quality</div>
                <div class="message">
                  <div class="content"><span class="data">105</span></div>
                  <div class="rate">Unhealthy</div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,defineProps,defineEmits } from "vue";
import {determineWindDirection,determineHumidityStatus,determineVisibilityStatus} from "@/utils/weather"
import {formatTime12h} from "@/utils/date"

const props = defineProps(['weatherData','weeklyForecastData','unitIndex'])
const emit = defineEmits(['unitBtnChange'])

let currentTabIndex = ref(1);
let currentTempBtnIndex = ref(0);

const handleTempBtnClick = (index) => {
  currentTempBtnIndex.value = index
  emit('unitBtnChange',currentTempBtnIndex.value)
}
</script>

<style lang="scss" scoped>
.right-main {
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 100%;
  margin: 0 auto;
  .tab {
    width: 100%;
    height: 50px;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    .today-week {
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        text-decoration: none;
        color: #ccc;
        margin-right: 15px;
      }
      .active {
        color: #000;
        font-weight: 550;
        padding: 5px;
        border-bottom: 2px #000 solid;
      }
    }
    .temp-button {
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        text-decoration: none;
        color: #000;
        font-size: 14px;
        font-weight: bold;
        padding: 5px;
      }
      .temp {
        width: 30px;
        height: 30px;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        margin-right: 10px;
      }
      .active {
        background-color: #000;
        a {
          color: #fff;
        }
      }
      .avatar {
        width: 30px;
        height: 30px;
        margin-left: 20px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
      }
    }
  }
  .weather-card {
    width: 100%;
    height: 100px;
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .card {
      width: 110px;
      height: 120px;
      background-color: #ffffff;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .time {
        height: 20px;
        font-size: 14px;
      }
      .weather-icon {
        height: 60px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .max-min {
        margin-top: 5px;
        height: 20px;
        font-size: 14px;
        .max {
          color: #000;
        }
        .min {
          color: #ccc;
        }
      }
    }
  }
  .highlights {
    width: 100%;
    height: 100%;
    margin-top: 50px;
    .title {
      height: 20px;
      font-size: 18px;
      font-weight: 550;
    }
    .highlight-card {
      width: 100%;
      height: 100%;
      margin-top: 10px;
      .item {
        width: 260px;
        height: 150px;
        border-radius: 10px;
        background-color: #fff;
        margin-top: 10px;
      }
      .item-box {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .title {
          margin-left: 20px;
          margin-top: 10px;
          color: #ccc;
          font-size: 16px;
          font-weight: normal;
        }
        .message {
          width: 160px;
          height: 110px;
          margin-left: 20px;
          img {
            width: 100%;
            height: 100%;
          }
          .wind-speed{
            width: 100%;
            height: 60px;
            padding: 20px 0 20px;
            margin-top: 10px;
            margin-bottom: 10px;
            .speed{
              font-size: 36px;
              font-weight: 520;
            }
          }
          .wind-deg{
            width: 100%;
            height: 40px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .deg{
              margin-left: 5px;
              height: 18px;
              font-size: 18px;
              text-align: center;
            }
            img{
              width: 32px;
              height: 32px;
            }
          }
          .rise-down{
            width: 100%;
            height: 55px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .time{
              display: flex;
              flex-direction: column;
              margin-left: 10px;
            }
            img{
              width: 40px;
              height: 40px;
            }
          }
          .content{
            width: 100%;
            height: 60px;
            padding: 20px 0 20px;
            margin-top: 10px;
            margin-bottom: 10px;
            .data{
              font-size: 36px;
              font-weight: 520;
            }
          }
          .rate{
            width: 100%;
            height: 40px;
            margin-top: 20px;
          }
        }
      }
    }
  }
}
</style>
