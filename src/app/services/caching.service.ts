import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models/user';
import { ICachedData } from '../models/cachedData';

@Injectable({
  providedIn: 'root',
})
export class CachingService {
  private cache = new Map<string, any>();
  public cacheSource$ = new BehaviorSubject<any>(null);
  constructor() {}

  setData(key: string, _data: any, _expiry: any) {
    let cachedData: ICachedData<IUser[]> = {
      data: _data,
      expiry: _expiry,
    };
    this.cache.set(key, cachedData);
    this.cacheSource$.next(this.cache.get(key));
    // ttl: Time-to-Live expiration for cached data
    // remove data after expiration.
    let _today = new Date();
    let _ttl = _expiry.getTime() - _today.getTime();
    setTimeout(() => {
      this.clear(key);
    }, _ttl);
  }
  get(key: string): any {
    const cachedData = this.cache.get(key);
    this.cacheSource$.next(cachedData);
    return cachedData;
  }

  clear(key: string): void {
    this.cache.delete(key);
    this.cacheSource$.next(null);
  }
}
