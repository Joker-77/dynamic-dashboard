import { IUser } from './user';
export interface IPagedList {
  data: IUser[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}
