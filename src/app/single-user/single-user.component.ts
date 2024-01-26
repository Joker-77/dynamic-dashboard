import { Component, OnInit } from '@angular/core';
import { IUser } from '../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss'],
})
export class SingleUserComponent implements OnInit {
  id: number = -1;
  user: IUser;
  loading: boolean = false;
  notFound: boolean = true;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.id = parseInt(paramMap.get('id')!);
      this.userService.get(this.id).subscribe((resp) => {
        this.loading = false;
        if (!!resp.data) this.notFound = false;
        this.user = resp.data;
      });
    });
  }

  back() {
    this.router.navigate(['users']);
  }
}
