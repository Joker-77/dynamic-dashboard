import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchUserService {
  searchVal = new BehaviorSubject<string>('');
  search$ = this.searchVal.asObservable();
  constructor() {}
  getSearch() {
    return this.search$;
  }
  setSearch(search: string) {
    this.searchVal.next(search);
  }
}
