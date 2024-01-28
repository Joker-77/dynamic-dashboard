import {
  Component,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { IUser } from '../models/user';
import { UsersService } from '../services/users.service';
import { IPagedList } from '../models/pagedList';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { IUrlSegment } from '../models/urlSegment';
import { ActiveLinkServiceService } from '../services/active-link-service.service';
import { SearchUserService } from '../services/search-user.service';
import { CachingService } from '../services/caching.service';
import { ICachedData } from '../models/cachedData';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  cachedData: any = null;
  users: IUser[] = [];
  filteredUsers: IUser[] = [];
  page: number = 1;
  pageSize: number = 6;
  total: number = 0;
  totalPages: number = 0;
  notFound: boolean = true;
  loading: boolean = false;
  search: string = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() public onPaginate: EventEmitter<any> = new EventEmitter();

  constructor(
    private userService: UsersService,
    private router: Router,
    private activeLinkService: ActiveLinkServiceService,
    private activatedRoute: ActivatedRoute,
    private searchService: SearchUserService,
    private cacheService: CachingService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.url.subscribe(([url]: IUrlSegment[]) => {
      this.activeLinkService.setActive(url.path);
    });
    this.loading = true;
    this.cacheService.cacheSource$.subscribe({
      next: (cached) => console.log(),
      error: (error) => console.log(error),
    });
    this.getData(this.page);
    this.activateSearch();
  }

  getData(page: number) {
    this.users = [];
    this.filteredUsers = [];
    this.loading = true;
    const cachedData = this.cacheService.get(page.toString());
    if (!!cachedData) {
      if (cachedData?.data?.data?.length > 0) this.notFound = false;
      this.users = cachedData?.data.data;
      this.filteredUsers = cachedData?.data.data;
      this.page = cachedData?.data.page - 1;
      this.pageSize = cachedData?.data.per_page;
      this.total = cachedData?.data.total;
      this.totalPages = cachedData?.data.total_pages;
      this.loading = false;
    } else {
      try {
        this.userService.getAll(page).subscribe((resp: IPagedList<IUser>) => {
          if (resp.data?.length > 0) this.notFound = false;
          this.users = resp.data;
          this.filteredUsers = resp.data;
          this.page = resp.page - 1;
          this.pageSize = resp.per_page;
          this.total = resp.total;
          this.totalPages = resp.total_pages;
          const expiryDate = new Date().setMinutes(new Date().getMinutes() + 5);
          this.cacheService.setData(
            page.toString(),
            resp,
            new Date(expiryDate)
          );
          this.loading = false;
        });
      } catch (error) {}
    }
  }

  activateSearch() {
    this.searchService.getSearch().subscribe({
      next: (search: string) => {
        this.loading = true;
        this.search = search;
        this.searchUser(search);
      },
      error: (err: any) => console.log(err),
    });
  }

  paginate(event: PageEvent) {
    this.loading = true;
    this.getData(event.pageIndex + 1);
  }

  goDetails(userId: number) {
    this.router.navigate(['/users', userId]);
  }

  searchUser(search: string) {
    let _resultUsers = this.users.filter((user: IUser) => {
      return (
        user.id.toString() == search ||
        user.first_name.toLowerCase().includes(search.toLowerCase()) ||
        user.last_name.toLowerCase().includes(search.toLowerCase())
      );
    });
    this.filteredUsers = _resultUsers;
    this.loading = false;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
