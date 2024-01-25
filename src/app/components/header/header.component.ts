import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router, RoutesRecognized } from '@angular/router';
import { Page } from '../../models/page';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}
  public pages: Page[] = [
    { name: 'Home', link: '', icon: 'home' },
    { name: 'Users', link: 'users', icon: 'person' },
  ];
  ngOnInit(): void {}

  navigate(page: Page) {
    this.router.navigate([page.link], { queryParamsHandling: 'preserve' });
  }
}
