<template>
  <div class="search-container" @click="handleClickOutside">
    <div class="search">
      <el-input
        style="width: 260px"
        size="small"
        placeholder="Search for places"
        v-model="queryCity"
        @focus="showRecentSearch = true"
        class="search-input"
      >
        <template #prepend>
          <el-button :icon="Search" @click="handleSearch"/>
        </template>
      </el-input>
    </div>
    <div class="recent-search" v-show="showRecentSearch">
      <div class="header">
        <div class="title">最近搜索</div>
        <div class="clear" @click="clearSearch">清空</div>
      </div>
      <div class="histories-wrap">
        <div class="histories">
          <div class="history-item" v-for="item in recentSearches" @click="handleClickSearch(item)">
            <div class="history-text">{{item}}</div>
            <div class="close" @click.stop="handleDelete(item)">
              <svg viewBox="0 0 1024 1024" width="14" height="14">
                <path
                  d="M512 64.303538c-247.25636 0-447.696462 200.440102-447.696462 447.696462
                0 247.254314 200.440102 447.696462 447.696462 447.696462s447.696462-200.440102
                447.696462-447.696462S759.25636 64.303538 512 64.303538zM710.491727 665.266709c12.491499
                12.491499 12.489452 32.729425-0.002047 45.220924-6.246261 6.246261-14.429641 9.370415-22.611997
                9.370415s-16.363689-3.121084-22.60995-9.366322L512 557.222971 358.730221 710.491727
                c-6.246261 6.246261-14.429641 9.366322-22.611997 9.366322s-16.365736-3.125177-22.611997-9.370415
                c-12.491499-12.491499-12.491499-32.729425 0-45.220924l153.268756-153.266709L313.50725 358.730221
                c-12.491499-12.491499-12.489452-32.729425 0.002047-45.220924s32.729425-12.495592 45.220924-0.004093
                l153.268756 153.268756 153.268756-153.268756c12.491499-12.491499 32.729425-12.487406 45.220924
                0.004093s12.493545 32.729425 0.002047 45.220924L557.225017 512 710.491727 665.266709z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ElMessage} from 'element-plus'
import { Search } from "@element-plus/icons-vue";
import { ref, onMounted, onUnmounted,defineEmits } from "vue";

const showRecentSearch = ref(false);
const recentSearches = ref(JSON.parse(localStorage.getItem("search")) || [])
let queryCity = ref('')
const emit = defineEmits(['clickSearch'])

// 点击搜索按钮的回调
const handleSearch = () => {
  if(queryCity.value == ''){
    ElMessage.warning('请输入城市名称！')
    return
  }
  if(recentSearches.value.indexOf(queryCity.value) !== -1){
    let index = recentSearches.value.indexOf(queryCity.value)
    recentSearches.value.splice(index,1)
  }
  recentSearches.value = [...recentSearches.value,queryCity.value].slice(0,10)
  localStorage.setItem('search',JSON.stringify(recentSearches.value))
  emit('clickSearch',queryCity.value)
  showRecentSearch.value = false
  queryCity.value = ''
}

// 点击清空按钮的回调
const clearSearch = () => {
  recentSearches.value = []
  localStorage.removeItem('search')
}

// 点击搜索历史城市的回调
const handleClickSearch = (city) => {
  let index = recentSearches.value.indexOf(city)
  if(index !== -1) recentSearches.value.splice(index,1)
  recentSearches.value = [...recentSearches.value,city].slice(0,10)
  localStorage.setItem('search',JSON.stringify(recentSearches.value))
  emit('clickSearch',city)
  queryCity.value = ''
}

// 点击删除按钮的回调
const handleDelete = (city) => {
  let index = recentSearches.value.indexOf(city)
  if(index !== -1){
    recentSearches.value.splice(index,1)
    localStorage.setItem('search',recentSearches.value)
  }
  if (recentSearches.value.length === 0) {
    localStorage.removeItem('search')
  }
  
}

// 监听点击事件，如果点击的不是搜索框或最近搜索列表，则隐藏列表
const handleClickOutside = (event) => {
  if (!event.composedPath().includes(document.querySelector(".search-container"))) {
    showRecentSearch.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  height: 30px;
  margin-top: 20px;
  margin-left: 10px;
  margin-bottom: 2px;
}
.recent-search {
  position: absolute;
  width: 260px;
  height: 300px;
  margin-left: 10px;
  border: 1px solid #e3e5e7;
  border-top: none;
  border-radius: 0 0 8px 8px;
  padding: 13px 0 16px;
  background-color: #fff;
  z-index: 999;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    .title {
      height: 24px;
      font-size: 14px;
      line-height: 22px;
      font-weight: 500;
    }
    .clear {
      font-size: 12px;
      line-height: 15px;
      height: 15px;
      color: #ccc;
      cursor: pointer;
      &:hover {
        color: #00aeec;
      }
    }
  }
  .histories-wrap {
    max-height: 300px;
    padding: 0 15px;
    overflow: hidden;
    .histories {
      display: flex;
      flex-wrap: wrap;
      margin-top: 12px;
      margin-right: -10px;
      margin-bottom: 4px;
      .history-item {
        position: relative;
        box-sizing: border-box;
        height: 30px;
        padding: 7px 10px 8px;
        font-size: 12px;
        line-height: 15px;
        background: #f6f7f8;
        border-radius: 4px;
        margin-right: 10px;
        margin-bottom: 10px;
        cursor: pointer;
        &:hover {
          outline: none;
          color: #00aeec;
          .close {
            display: block;
          }
        }
        .history-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 96px;
        }
        .close {
          display: none;
          box-sizing: border-box;
          position: absolute;
          width: 16px;
          height: 16px;
          top: -6px;
          right: -6px;
          padding: 2px;
        }
      }
    }
  }
}
</style>
