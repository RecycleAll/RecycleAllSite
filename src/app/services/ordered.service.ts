import {Injectable} from '@angular/core';
import {Ordered, OrderedCreation} from "../models/ordered.model";
import {EMPTY, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrderedService {

  private ordered: Ordered[] = [];
  public orderedSubject = new Subject<Ordered[]>();

  constructor(private httpClient: HttpClient) { }

  emitOrdered() {
    this.orderedSubject.next(this.ordered);
  }

  async getOne(id: number){
    return await this.httpClient.get<Ordered>(
      environment.API_URL + `ordered/one/${id}`
    ).toPromise();
  }

  async getAll() {
    const promise = await this.httpClient.get<Ordered[]>(
      environment.API_URL + 'ordered/all',
      {observe: 'response'}
    ).pipe(catchError(() => {
      return EMPTY;
    })).toPromise();

    if (promise.status === 200 && promise.body != null){
      this.ordered = promise.body;
    }
    this.emitOrdered();
  }

  async create(props: OrderedCreation) {
    const promise = await this.httpClient.post<Ordered>(
      environment.API_URL + 'ordered/',
      {
        price: props.price,
        coins_used: props.coins_used,
        price_after_reduce: props.price_after_reduce,
        date: props.date,
        billing_address: props.billing_address,
        user_id: props.user_id,
        send_id: props.send_id
      }, {observe: 'response'}
    ).pipe(catchError(() => {
      return EMPTY;
    })).toPromise();

    if (promise.status === 201 && promise.body !== null){
      return promise.body;
    }
    return null;
  }

  async update(props: Ordered){
    const promise = await this.httpClient.put<Ordered>(
      environment.API_URL + 'ordered/',
      {
        id: props.id,
        price: props.price,
        coins_used: props.coins_used,
        price_after_reduce: props.price_after_reduce,
        date: props.date,
        billing_address: props.billing_address,
        user_id: props.user_id,
        send_id: props.send_id
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
      environment.API_URL + `ordered/${id}`,
      {observe: 'response'}
    ).toPromise();
    return promise.status === 200;
  }

}
