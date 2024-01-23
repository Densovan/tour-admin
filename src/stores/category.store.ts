import { defineStore } from "pinia";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: [],
    toggleCreate: false,
    toggleEdit: false,
    toggleView: false,
    setCurrentId: "",
  }),

  getters: {},
  actions: {
    setToggleCreate(toggleCreate: boolean): void {
      this.toggleCreate = toggleCreate;
    },
    setToggleUpdate(toggleEdit: boolean): void {
      this.toggleEdit = toggleEdit;
    },
  },
});
