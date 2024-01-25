import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPagedList } from '../models/pagedList';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _usersUrl = `${environment.apiUrl}/users`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<IPagedList<IUser>> {
    return this.http.get<IPagedList<IUser>>(this._usersUrl);
  }
}
