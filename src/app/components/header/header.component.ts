import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router, RoutesRecognized, ActivatedRoute } from '@angular/router';
import { Page } from '../../models/page';
import { IUrlSegment } from '../../models/urlSegment';
import { ActiveLinkServiceService } from '../../services/active-link-service.service';
import { SearchUserService } from '../../services/search-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  active: string = '';
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UsersService,
    private activeLinkService: ActiveLinkServiceService,
    private searchService: SearchUserService
  ) {}
  public pages: Page[] = [
    { name: 'Home', active: '', link: '', icon: 'home' },
    { name: 'Users', active: 'users', link: 'users', icon: 'person' },
  ];
  ngOnInit(): void {
    this.activeLinkService.getActive().subscribe({
      next: (active: string) => {
        this.active = active;
      },
      error: (err: any) => console.log(err),
    });
  }

  navigate(page: Page) {
    this.router.navigate([page.link], { queryParamsHandling: 'preserve' });
  }

  search($event: Event) {
    this.searchService.setSearch(($event.target as HTMLInputElement).value);
  }
}
