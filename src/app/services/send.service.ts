import { Injectable } from '@angular/core';
import {Send, SendCreation} from "../models/send.model";
import {EMPTY, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Address} from "../models/address.model";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SendService {

  private send : Send[] = [];
  public sendSubject = new Subject<Send[]>();

  constructor(private httpClient: HttpClient) { }

  emitSend() {
    this.sendSubject.next(this.send);
  }

  async getOne(id: number){
    return await this.httpClient.get<Send>(
      environment.API_URL + `send/${id}`
    ).toPromise();
  }

  async getAll() {
    const promise = await this.httpClient.get<Send[]>(
      environment.API_URL + 'send/',
      {observe: 'response'}
    ).pipe(catchError(() => {
      return EMPTY;
    })).toPromise();

    if (promise.status === 200 && promise.body != null){
      this.send = promise.body;
    }
    this.emitSend();
  }

  async create(props: SendCreation) {
    const promise = await this.httpClient.post<Send>(
      environment.API_URL + 'send/',
      {
        date: props.date,
        send_type: props.send_type,
        status: props.send_type,
        delivery_address: props.delivery_address
      }, {observe: 'response'}
    ).pipe(catchError(() => {
      return EMPTY;
    })).toPromise();

    if (promise.status === 201 && promise.body !== null){
      return promise.body;
    }
    return null;
  }

  async update(props: Send) {
    const promise = await this.httpClient.put<Send>(
      environment.API_URL + 'send/',
      {
        id: props.id,
        date: props.date,
        send_type: props.send_type,
        status: props.send_type,
        delivery_address: props.delivery_address
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
      environment.API_URL + `send/${id}`,
      {observe: 'response'}
    ).toPromise();
    return promise.status === 200;
  }

}
