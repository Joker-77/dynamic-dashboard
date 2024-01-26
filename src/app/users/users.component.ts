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
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: IUser[] = [];
  page: number = 0;
  pageSize: number = 6;
  total: number = 0;
  totalPages: number = 0;
  notFound: boolean = true;
  loading: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() public onPaginate: EventEmitter<any> = new EventEmitter();

  constructor(private userService: UsersService, private router: Router) {}
  ngOnInit(): void {
    this.loading = true;
    this.userService.getAll(this.page).subscribe((resp: IPagedList<IUser>) => {
      this.loading = false;
      if (resp.data?.length > 0) this.notFound = false;
      this.users = resp.data;
      this.page = resp.page - 1;
      this.pageSize = resp.per_page;
      this.total = resp.total;
      this.totalPages = resp.total_pages;
    });
  }

  paginate(event: PageEvent) {
    this.loading = true;
    this.userService
      .getAll(event.pageIndex + 1)
      .subscribe((resp: IPagedList<IUser>) => {
        this.loading = false;
        this.users = resp.data;
        this.page = resp.page - 1;
        this.pageSize = resp.per_page;
        this.total = resp.total;
        this.totalPages = resp.total_pages;
      });
  }

  goDetails(userId: number) {
    this.router.navigate(['/users', userId]);
  }
}
