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

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: IUser[] = [];
  filteredUsers: IUser[] = [];
  page: number = 0;
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
    private searchService: SearchUserService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.url.subscribe(([url]: IUrlSegment[]) => {
      this.activeLinkService.setActive(url.path);
    });
    this.loading = true;
    this.userService.getAll(this.page).subscribe((resp: IPagedList<IUser>) => {
      this.loading = false;
      if (resp.data?.length > 0) this.notFound = false;
      this.users = resp.data;
      this.filteredUsers = resp.data;
      this.page = resp.page - 1;
      this.pageSize = resp.per_page;
      this.total = resp.total;
      this.totalPages = resp.total_pages;
    });
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
    this.userService
      .getAll(event.pageIndex + 1)
      .subscribe((resp: IPagedList<IUser>) => {
        this.loading = false;
        this.users = resp.data;
        this.filteredUsers = resp.data;
        this.page = resp.page - 1;
        this.pageSize = resp.per_page;
        this.total = resp.total;
        this.totalPages = resp.total_pages;
      });
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
}
