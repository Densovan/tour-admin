<script lang="ts" setup>
import { toggleDark, isDark } from "@/composables";
import { Icon } from "@iconify/vue";
import { UserFilled } from "@element-plus/icons-vue";
</script>

<template>
  <el-menu mode="horizontal">
    <div class="flex justify-between w-[96%]">
      <div>
        <el-menu-item>
          <h1 color="$ep-color-primary" class="font-bold text-3xl">
            Tours Cambodia
          </h1>
        </el-menu-item>
      </div>
      <div class="flex items-center space-x-3">
        <el-menu-item h="full" @click="toggleDark()">
          <button class="border-none w-full bg-transparent cursor-pointer">
            <Icon
              v-if="!isDark"
              width="40"
              icon="meteocons:clear-day-fill"
              :rotate="3"
            />
            <Icon
              v-else
              width="40"
              icon="meteocons:clear-night-fill"
              :rotate="3"
            />
          </button>
        </el-menu-item>
        <div>
          <el-avatar :icon="UserFilled" />
        </div>
      </div>
    </div>
  </el-menu>
</template>
