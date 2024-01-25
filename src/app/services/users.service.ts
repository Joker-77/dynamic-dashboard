import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPagedList } from '../models/pagedList';
import { IUser, ISingleUserResponse } from '../models/user';

type Options = {
  headers?: HttpHeaders | { [header: string]: string | string[] } | undefined;
  params?: HttpParams | undefined;
};
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _usersUrl = `${environment.apiUrl}/users`;
  constructor(private http: HttpClient) {}

  private optionsBuilder(page?: number): Options {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams().set('page', page ?? ''),
    };
  }
  getAll(page: number): Observable<IPagedList<IUser>> {
    return this.http.get<IPagedList<IUser>>(
      this._usersUrl,
      this.optionsBuilder(page)
    );
  }

  get(id: number): Observable<ISingleUserResponse> {
    return this.http.get<ISingleUserResponse>(this._usersUrl + `/${id}`);
  }
}
