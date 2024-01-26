import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { SingleUserComponent } from './single-user/single-user.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    data: { breadcrumb: 'Users' },
  },
  {
    path: 'users/:id',
    component: SingleUserComponent,
    data: { breadcrumb: 'User Details' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
