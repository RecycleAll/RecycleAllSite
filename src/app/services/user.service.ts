import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {environment} from "../../environments/environment";
import {EMPTY, Subject} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [];
  public usersSubject = new Subject<User[]>();

  constructor(private httpClient: HttpClient) { }

  emitUsers() {
    this.usersSubject.next(this.users);
  }

  async getOne(id: number) {
    return await this.httpClient.get<User>(
      environment.API_URL + `auth/${id}`,
    ).toPromise();
  }

  async getAll() {
    const promise = await this.httpClient.get<User[]>(
      environment.API_URL + "auth/"
      ,{observe: 'response'}
    ).pipe(
      catchError(() => {
        return EMPTY;
      })
    ).toPromise();

    if (promise.status === 200 && promise.body != null) {
      this.users = promise.body;
    }
    this.emitUsers();
  }

  async delete(id: number) {
    const promise = await this.httpClient.delete(
      environment.API_URL + `auth/${id}`,
      {observe: 'response'}
    ).toPromise();
    return promise.status === 200;
  }

}
