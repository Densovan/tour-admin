<script setup lang="ts">
import { RouterView } from "vue-router";
import Sidebar from "./sidebar.vue";
import Navbar from "./navbar.vue";
import { ref } from "vue";
</script>

<template>
  <Navbar />
  <div class="flex main-container">
    <el-aside width="250px" class="border-none">
      <el-scrollbar>
        <Sidebar />
      </el-scrollbar>
    </el-aside>
    <div class="w-full px-4 py-4">
      <RouterView />
      <!-- <el-container>
        <el-main class="w-full">
          <el-scrollbar> <RouterView /></el-scrollbar
        ></el-main>
      </el-container> -->
    </div>
  </div>
</template>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
<!-- <template>
  <el-container class="layout-container-demo" style="height: 500px">
    <el-scrollbar>
      <Sidebar />
    </el-scrollbar>

    <el-container>
      <el-header>
        <Navbar />
      </el-header>
      <el-main class="w-full">
        <el-scrollbar> <RouterView /></el-scrollbar
      ></el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";
import { RouterView } from "vue-router";
import Sidebar from "./sidebar.vue";
import Navbar from "./navbar.vue";

const item = {
  date: "2016-05-02",
  name: "Tom",
  address: "No. 189, Grove St, Los Angeles",
};
const tableData = ref(Array.from({ length: 20 }).fill(item));
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style> -->
