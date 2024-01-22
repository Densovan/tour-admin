import { IItems, IMeta } from "./global.type";

export type CategoryCreate = {
  name: string;
  logo: string;
};
export interface ICategory {
  items: Array<IItems>;
  meta: IMeta;
}

export interface RequestQuery {
  limit?: number;
  page?: number;
  filterKeyword?: string;
  sortField?: string;
  sortDirection?: string;
  name?: string;
}
