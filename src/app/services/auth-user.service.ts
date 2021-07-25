import {Injectable} from '@angular/core';
import {Session} from "../models/session.model";
import {EMPTY, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../models/user.model";
import {catchError} from "rxjs/operators";

export interface UserClientCreationProps {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
}

export interface UserAdminCreationProps extends UserClientCreationProps {
  work_in?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  private session?: Session = undefined;

  public sessionSubject = new Subject<Session>();

  constructor(private httpClient: HttpClient) {
  }

  isAuth() {
    return this.session !== undefined;
  }

  getSession() {
    return this.session;
  }

  emitSession() {
    this.sessionSubject.next(this.session);
  }

  async logIn(email: string, password: string) {

    const promise = await this.httpClient.post<Session>(
      environment.API_URL + "auth/login",
      {
        email: email,
        password: password
      },
      {observe: 'response'}
    ).pipe(
      catchError(() => {
        return EMPTY;
      })
    ).toPromise();

    if (promise.status === 201) {
      if (promise.body != null) {
        this.session = promise.body;
        return true;
      }
    }
    return false;
  }

  async subscribe(props: UserClientCreationProps) {
    this.httpClient.post<User>(
      environment.API_URL + "auth/subscribe",
      {
        firstname: props.firstname,
        lastname: props.lastname,
        email: props.email,
        password: props.password
      }
    ).subscribe(
      response => {
        console.log("new user : ", response)
      }, error => {
        console.log("Error : ", error)
      }
    );
  }


  async register(props: UserAdminCreationProps) {
    const promise = await this.httpClient.post<User>(
      environment.API_URL + "auth/register",
      {
        firstname: props.firstname,
        lastname: props.lastname,
        email: props.email,
        password: props.password,
        work_in: props.work_in
      },
      {observe: "response"}
    ).pipe(catchError(() => {
      return EMPTY;
    })).toPromise();
    return promise.status == 201;
  }

  logOut() {
    if (this.session === undefined) {
      return;
    }
    let options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.session.token}`,
      })
    };
    this.httpClient.delete(
      environment.API_URL + "auth/logout",
      options,
    ).subscribe(
      response => {
        console.log("Session delete !");
        this.session = undefined;
        this.emitSession();
      },
      error => {
        console.log("Error : ", error);
      }
    )
  }

  async update(props: User) {
    const promise = await this.httpClient.put<User>(
      environment.API_URL + "auth/",
      {
        id: props.id,
        firstname: props.firstname,
        lastname: props.lastname,
        email: props.email,
        password: props.password,
        work_in: props.work_in,
        recycle_coins: props.recycle_coins
      },
      {observe: 'response'}
    ).pipe(
      catchError(() => {
        return EMPTY;
      })
    ).toPromise();

    if (promise.status === 200 && promise.body !== null) {
      return promise.body;
    }
    return null;
  }


}
