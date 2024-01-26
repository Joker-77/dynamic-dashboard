import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ActiveLinkServiceService {
  private activeLink = new BehaviorSubject<string>('');
  active$ = this.activeLink.asObservable();
  constructor() {}

  getActive() {
    return this.active$;
  }

  setActive(active: string) {
    this.activeLink.next(active);
  }
}
