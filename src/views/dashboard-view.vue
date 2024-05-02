<template>
  <span v-if="isPending">{{ loadingInstance }}</span>
  <span v-else-if="isError">Error: {{ error?.message }}</span>
  <div v-else>
    <div class="grid grid-cols-4 gap-4">
      <div
        :style="{
          boxShadow: `var(${getCssVarName('lighter')})`,
        }"
        class="p-4 rounded-lg text-red-400"
      >
        <div class="flex space-x-3 items-center">
          <Icon
            width="4rem"
            height="4rem"
            class=""
            icon="material-symbols:supervised-user-circle"
          />
          <div class="leading-0">
            <h4>Users</h4>
            <p>{{ dashboard.data.summarize.userCount }}</p>
          </div>
        </div>
      </div>
      <div
        :style="{
          boxShadow: `var(${getCssVarName('lighter')})`,
        }"
        class="p-4 rounded-lg text-red-400"
      >
        <div class="flex space-x-3 items-center">
          <Icon
            width="4rem"
            height="4rem"
            class=""
            icon="material-symbols:supervised-user-circle"
          />
          <div class="leading-0">
            <h4>Categories</h4>
            <p>{{ dashboard.data.summarize.categoryCount }}</p>
          </div>
        </div>
      </div>
      <div
        :style="{
          boxShadow: `var(${getCssVarName('lighter')})`,
        }"
        class="p-4 rounded-lg text-green-400"
      >
        <div class="flex space-x-3 items-center">
          <Icon
            width="4rem"
            height="4rem"
            class=""
            icon="material-symbols:supervised-user-circle"
          />
          <div class="leading-0">
            <h4>Tours</h4>
            <p>{{ dashboard.data.summarize.tourCount }}</p>
          </div>
        </div>
      </div>
      <div>dfasf</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query';
import { Icon } from '@iconify/vue';
import { dashboardApi } from '@/common/api/dashboard-api';
import { IDashboard } from '@/common';
import { useDashboardStore } from '@/stores/dashboard.store';
import { storeToRefs } from 'pinia';
import { nextTick } from 'vue';
import { ElLoading } from 'element-plus';

const loadingInstance = ElLoading.service({ fullscreen: true });
nextTick(() => {
  // Loading should be closed asynchronously
  loadingInstance.close();
});
const getCssVarName = (type: string) => {
  return `--el-box-shadow${type ? '-' : ''}${type}`;
};
const { GET_DASHBOARDS } = dashboardApi();
const dashboardStore = useDashboardStore();
const { dashboard } = storeToRefs(dashboardStore);
const { isPending, isError, error } = useQuery({
  queryKey: ['dashboard'],
  queryFn: async () => await GET_DASHBOARDS(),

  select: (res: IDashboard) => {
    dashboardStore.addDashboardData(res);
  },
});
</script>

<style scoped>
.border {
  border: 0.5px solid rgb(229, 79, 79);
}
</style>
