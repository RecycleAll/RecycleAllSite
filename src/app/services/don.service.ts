import {Injectable} from '@angular/core';
import {EMPTY, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {Don, DonCreation} from "../models/don.model";

@Injectable({
  providedIn: 'root'
})
export class DonService {

  private dons: Don[] = [];
  public donSubject = new Subject<Don[]>();

  constructor(private httpClient: HttpClient) { }

  emitDon() {
    this.donSubject.next(this.dons);
  }

  async getOne(id: number){
    return await this.httpClient.get<Don>(
      environment.API_URL + `don/one/${id}`
    ).toPromise();
  }

  async getAllByUser(id: number){
    return await this.httpClient.get<Don[]>(
      environment.API_URL + `don/user/${id}`
    ).toPromise();
  }

  async getAll() {
    const promise = await this.httpClient.get<Don[]>(
      environment.API_URL + 'don/all',
      {observe: 'response'}
    ).pipe(catchError(() => {
      return EMPTY;
    })).toPromise();

    if (promise.status === 200 && promise.body != null){
      this.dons = promise.body;
    }
    this.emitDon();
  }

  async create(props: DonCreation) {
    const promise = await this.httpClient.post<Don>(
      environment.API_URL + 'don/',
      props,
      {observe: 'response'}
    ).pipe(catchError(() => {
      return EMPTY;
    })).toPromise();

    if (promise.status === 201 && promise.body !== null){
      return promise.body;
    }
    return null;
  }

  async update(props: Don){
    const promise = await this.httpClient.put<Don>(
      environment.API_URL + 'don/',
      {
        id: props.id,
        date: props.date,
        user_id: props.user_id,
        coins_win: props.coins_win
      }, {observe: 'response'}
    ).pipe(catchError(() => {
      return EMPTY;
    })).toPromise();

    if (promise.status === 200 && promise.body !== null){
      return promise.body;
    }
    return null;
  }

  async delete(id: number) {
    const promise = await this.httpClient.delete(
      environment.API_URL + `don/${id}`,
      {observe: 'response'}
    ).toPromise();
    return promise.status === 200;
  }
}
