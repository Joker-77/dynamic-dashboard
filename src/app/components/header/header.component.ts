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
  constructor(private router: Router, private userService: UsersService) {}
  public pages: Page[] = [
    { name: 'Home', link: '', icon: 'home' },
    { name: 'Users', link: 'users', icon: 'person' },
  ];
  ngOnInit(): void {
    // this.userService.get(1).subscribe((resp) => {
    //   console.clear();
    //   console.log(resp);
    // });
  }

  navigate(page: Page) {
    this.router.navigate([page.link], { queryParamsHandling: 'preserve' });
  }
}
