<script setup lang="ts">
import { RouterView } from "vue-router";
import Sidebar from "./sidebar.vue";
import Navbar from "./navbar.vue";
import { ref } from "vue";
</script>

<template>
  <Navbar />
  <div class="flex main-container">
    <Sidebar />
    <div class="w-full px-4 py-4">
      <RouterView />
    </div>
  </div>
</template>

<style></style>

<!-- <template>
  <div>
    <div class="sticky top-0">
      <Navbar />
    </div>
    <div class="flex space-x-4">
      <div>
        <Sidebar />
      </div>
      <div class="bg-white p-12">
        <RouterView />
      </div>
    </div>
  </div>
</template> -->

<!-- <style lang="scss" scoped></style> -->
