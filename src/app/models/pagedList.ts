export interface IPagedList<TData> {
  data: TData[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  support: { url: string; text: string };
}
