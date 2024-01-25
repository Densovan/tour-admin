import { IMeta } from "./global.type";

export type CategoryCreate = {
  name: string;
  logo: string;
};

export type CategoryUpdate = {
  _id: string;
  name: string;
  logo: string;
};
export interface ICategory {
  items: Array<IItemsCategory>;
  meta: IMeta;
}

export interface IItemsCategory {
  _id: string;
  name?: string;
  logo?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface RequestQuery {
  limit?: number;
  page?: number;
  filterKeyword?: string;
  sortField?: string;
  sortDirection?: string;
  name?: string;
}
