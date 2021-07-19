import { Injectable } from '@angular/core';
import {Session} from "../models/session.model";
import {EMPTY, Subject} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../models/user.model";
import {catchError} from "rxjs/operators";

export interface UserClientCreationProps {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
}

export interface UserAdminCreationProps extends UserClientCreationProps{
  work_in?:number;
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

    if (promise.status === 201){
      if (promise.body != null){
        this.session = promise.body;
        return true;
      }
    }
    return false;
  }

  subscribe(props: UserClientCreationProps) {
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
    this.httpClient.post<any>(
      environment.API_URL + "auth/register",
      {
        firstname: props.firstname,
        lastname: props.lastname,
        email: props.email,
        password: props.password,
        work_id: props.work_in
      }
    ).subscribe(
      response => {
        console.log("new user : ", response)
      }, error => {
        console.log("Error : ", error)
      }
    );
  }

  logOut() {
    if (this.session === undefined){
      return;
    }
    let options = {
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.session.token}`,
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

}
