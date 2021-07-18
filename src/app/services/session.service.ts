import { Injectable } from '@angular/core';
import {Session} from "../models/session.model";
import {Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class SessionService {
  private session?: Session = undefined;

  public sessionSubject = new Subject<Session>();

  constructor(private httpClient: HttpClient) {
  }

  // emitSession() {
  //   this.sessionSubject(this.session);
  // }

  async getUser() {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept' : 'application/json',
    });
    let options = {
      headers: httpHeaders
    };
    this.httpClient
      .get<any>(environment.API_URL + "auth/1")
      .subscribe(
        res => {
          console.log(res)
        },
        error => {
          console.log(error)
        }
      )
  }

  async logIn(email: string, password: string) {

    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
    });
    let options = {
      headers: httpHeaders
    };
    this.httpClient
      .post<any>(
        environment.API_URL + "auth/login",
        {
          email: email,
          password: password
        },
        options
      )
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log("Error : ", error);
        }
      )
    // this.emitSession();
  }

}
