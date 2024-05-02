import { defineStore } from 'pinia';
import { IDashboard } from '@/common';

interface State {
  dashboard: IDashboard;
}
export const useDashboardStore = defineStore('dashboard', {
  state: (): State => ({
    dashboard: {
      data: {
        summarize: {
          userCount: 0,
          categoryCount: 0,
          tourCount: 0,
        },
      },
    },
  }),

  getters: {},
  actions: {
    addDashboardData(data: IDashboard): void {
      this.dashboard = data;
    },
  },
});
