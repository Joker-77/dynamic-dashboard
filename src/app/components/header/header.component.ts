import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router, RoutesRecognized, ActivatedRoute } from '@angular/router';
import { Page } from '../../models/page';
import { IUrlSegment } from '../../models/urlSegment';
import { ActiveLinkServiceService } from '../../services/active-link-service.service';
import { SearchUserService } from '../../services/search-user.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  getActiveLink,
  updateActiveLink,
  IAppState,
} from '../../store/app.state';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // update active using RxJs
  active: string = '';
  activeNgRx$: Observable<any>;
  // update active using NgRx Store

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<IAppState>,
    private userService: UsersService,
    private activeLinkService: ActiveLinkServiceService,
    private searchService: SearchUserService
  ) {
    this.activeNgRx$ = this.store.select(getActiveLink);
  }
  public pages: Page[] = [
    { name: 'Home', active: '', link: '', icon: 'home' },
    { name: 'Users', active: 'users', link: 'users', icon: 'person' },
  ];
  ngOnInit(): void {
    // here I use RxJs to subscribe to active link which updated based on route
    // in each component (using ActivatedRoute)
    this.activeLinkService.getActive().subscribe({
      next: (active: string) => {
        this.active = active;
      },
      error: (err: any) => console.log(err),
    });

    // we can get value of NgRx state by subscribing to activeNgRx$ as Observable
    // and we can update global state using (updateActiveLink) that's predefined in app.state.ts folder
    /* 
      this.activeNgRx$.subscribe({
        next: (res) => {
          console.log(res?.activeLink);
        },
      }); 
    */
  }

  navigate(page: Page) {
    this.router.navigate([page.link], { queryParamsHandling: 'preserve' });
  }

  search($event: Event) {
    this.searchService.setSearch(($event.target as HTMLInputElement).value);
  }
}
