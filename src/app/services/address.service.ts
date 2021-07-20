import { Injectable } from '@angular/core';
import {Address, AddressCreation} from "../models/address.model";
import {EMPTY, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private address: Address[] = [];
  public addressSubject = new Subject<Address[]>();

  constructor(private httpClient: HttpClient) { }

  emitAddress() {
    this.addressSubject.next(this.address);
  }

  async getOne(id: number){
    return await this.httpClient.get<Address>(
      environment.API_URL + `address/${id}`
    ).toPromise();
  }

  async getAll() {
    const promise = await this.httpClient.get<Address[]>(
      environment.API_URL + 'address/',
      {observe: 'response'}
    ).pipe(catchError(() => {
        return EMPTY;
      })).toPromise();

    if (promise.status === 200 && promise.body != null){
      this.address = promise.body;
    }
    this.emitAddress();
  }

  async create(props: AddressCreation) {
    const promise = await this.httpClient.post<Address>(
      environment.API_URL + 'address/',
      {
        name: props.name,
        number: props.number,
        way: props.way,
        complement_way: props.complement_way,
        postal_code: props.postal_code,
        city: props.city
      },
      {observe: 'response'}
    ).pipe(catchError(() => {
      return EMPTY;
    })).toPromise();

    if (promise.status === 201 && promise.body !== null){
      return promise.body;
    }
    return null;
  }

  async update(props: Address) {
    const promise = await this.httpClient.put<Address>(
      environment.API_URL + 'address/',
      {
        id: props.id,
        name: props.name,
        number: props.number,
        way: props.way,
        complement_way: props.complement_way,
        postal_code: props.postal_code,
        city: props.city
      },
      {observe: 'response'}
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
      environment.API_URL + `address/${id}`,
      {observe: 'response'}
    ).toPromise();
    return promise.status === 200;
  }

}
