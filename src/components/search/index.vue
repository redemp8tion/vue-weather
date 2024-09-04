<template>
  <div class="search">
    <el-input style="width: 240px" size="small" placeholder="Search for places">
      <template #prepend>
        <el-button :icon="Search" />
      </template>
    </el-input>
  </div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  height: 30px;
  margin-top: 20px;
  margin-left: 10px;
}
</style>
