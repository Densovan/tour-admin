import { ICategory, IItemsCategory } from './../common/types/category.type';
import { defineStore } from 'pinia';

interface State {
  categories: ICategory;
  toggleCreate: boolean;
  toggleEdit: boolean;
  toggleDelete: boolean;
  toggleView: boolean;
  setCurrentId: string;
  currentPointedId: string;
  currentPointForm: {
    _id?: string | undefined;
    logo?: string | undefined;
    name?: string | undefined;
  };
}

export const useCategoryStore = defineStore('category', {
  state: (): State => ({
    categories: {
      items: [],
      meta: {
        totalItems: 0,
        limit: 0,
        skip: 0,
      },
    },
    toggleCreate: false,
    toggleEdit: false,
    toggleDelete: false,
    toggleView: false,
    setCurrentId: '',
    currentPointForm: {
      _id: '',
      logo: '',
      name: '',
    },
    currentPointedId: '',
  }),

  getters: {
    getCurrentPontId(state): string {
      return state.currentPointForm?._id || '';
    },
  },
  actions: {
    setCurrentPointedId(id: string): void {
      this.currentPointedId = id;
    },

    setToggleCreate(toggleCreate: boolean): void {
      this.toggleCreate = toggleCreate;
    },
    setToggleEdit(toggleEdit: boolean): void {
      this.toggleEdit = toggleEdit;
    },

    setToggleDelete(toggleDelete: boolean): void {
      console.log(toggleDelete, 'toggleDelete');
      this.toggleDelete = toggleDelete;
    },

    addCategories(categories: ICategory): void {
      this.categories = categories;
    },

    setCurrentPointForm(category: IItemsCategory | undefined): void {
      this.currentPointForm.logo = category?.logo;
      this.currentPointForm.name = category?.name;
      this.currentPointForm._id = category?._id;
    },
  },
});
