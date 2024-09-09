<template>
  <div class="main">
    <div class="dashboard">
      <el-row>
        <el-col :xs="16" :sm="12" :md="8" :lg="6" :xl="8">
          <div class="grid-content left">
            <div class="search">
              <Search @clickSearch="handleClickSearch"></Search>
            </div>
            <div class="weather-img" v-if="currentWeatherData.weather">
              <img
                :src="`https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${currentWeatherData.weather[0].icon}.png`"
                alt=""
              />
            </div>
            <div class="daily-message">
              <div class="temp">
                <span class="temperature">{{
                  currentWeatherData.main?.temp
                }}</span>
                <span class="degree" v-if="unitIndex === 0">℃</span>
                <span class="degree" v-else>℉</span>
              </div>
              <div class="time">
                <span class="week"
                  >{{
                    formatDateTimeWithWeek(currentWeatherData.dt).split(",")[0]
                  }},
                </span>
                <span class="time-now">{{
                  formatDateTimeWithWeek(currentWeatherData.dt).split(",")[1]
                }}</span>
              </div>
            </div>
            <div class="weather-message">
              <div class="weather-flex">
                <img src="../assets/cloud.png" alt="" />
                {{ describeCloudCover(currentWeatherData.clouds?.all) }}
              </div>
              <div class="weather-flex">
                <img src="../assets/rain.png" alt="" />
                Rain - 30%
              </div>
            </div>
            <div class="city">
              <span class="name"
                >{{ currentWeatherData.name }},{{
                  currentWeatherData.sys?.country
                }}</span
              >
            </div>
          </div>
        </el-col>
        <el-col :xs="8" :sm="12" :md="16" :lg="18" :xl="16">
          <div class="grid-content right">
            <weatherCard
              :weatherData="currentWeatherData"
              :weeklyForecastData="weeklyForecast"
              :unitIndex="unitIndex"
              @unitBtnChange="handleClickUnitBtn"
            ></weatherCard>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchWeatherData, fetchForecastWeatherData } from "@/api/weather";
import { describeCloudCover } from "@/utils/weather";
import { formatDateTimeWithWeek } from "@/utils/date";

let currentWeatherData = ref({});
let weeklyForecast = ref([]);
let recentSearches = ref(JSON.parse(localStorage.getItem("search")) || []);
let recentCity = recentSearches.value[recentSearches.value.length - 1];
let unitIndex = ref(0)

const handleClickSearch = (city) => {;
  if(unitIndex.value === 0){
    getTodayWeatherData(city,'metric')
    getWeekWeatherData(city,'metric')
  }else if(unitIndex.value === 1){
    getTodayWeatherData(city,'imperial')
    getWeekWeatherData(city,'imperial')
  }else{
    ElMessage.error('error')
    return
  }
};

const handleClickUnitBtn = (btnIndex) => {
  unitIndex.value = btnIndex
  recentSearches.value = JSON.parse(localStorage.getItem('search'))
  recentCity = recentSearches.value[recentSearches.value.length - 1]
  if(btnIndex === 0){
    getTodayWeatherData(recentCity,'metric')
    getWeekWeatherData(recentCity,'metric')
  }else if(btnIndex === 1){
    getTodayWeatherData(recentCity,'imperial')
    getWeekWeatherData(recentCity,'imperial')
  }else{
    ElMessage.error('error')
    return
  }
}

const getTodayWeatherData = async (city, unit = "metric") => {
  if (!recentCity) {
    currentWeatherData.value = await fetchWeatherData("Guangdong", unit);
  } else {
    currentWeatherData.value = await fetchWeatherData(city, unit);
  }
};

const getWeekWeatherData = async (city, unit = "metric") => {
  if (!recentCity) {
    weeklyForecast.value = await fetchForecastWeatherData("Guangdong", unit);
  } else {
    weeklyForecast.value = await fetchForecastWeatherData(city, unit);
  }
};

onMounted(() => {
  if (!recentCity) {
    getTodayWeatherData();
    getWeekWeatherData();
  } else {
    getTodayWeatherData(recentCity);
    getWeekWeatherData(recentCity);
  }
});
</script>

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
      .city {
        width: 80%;
        height: 65px;
        margin-top: 60px;
        margin-left: 30px;
        border-radius: 10px;
        background: url(../assets/city.jpg) no-repeat center;
        display: flex;
        justify-content: center;
        align-items: center;
        .name {
          color: #fff;
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
