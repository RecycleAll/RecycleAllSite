import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserAddress, UserAddressCreation} from "../models/userAddress.model";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {EMPTY} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserAddressService {

  constructor(private httpClient: HttpClient) { }

  async create(props: UserAddressCreation) {
    const promise = await this.httpClient.post<UserAddress>(
      environment.API_URL + 'userAddress/',
      {
        user_id: props.user_id,
        address_id: props.address_id
      }, {observe: 'response'}
    ).pipe(catchError(() => {
      return EMPTY;
    })).toPromise();

    if (promise.status === 201 && promise.body !== null){
      return promise.body;
    }
    return null;
  }

  async getAll() {
    return  await this.httpClient.get<UserAddress[]>(
      environment.API_URL + 'userAddress/all',
      {observe: "response"}
    ).toPromise();
  }

  async getAllByUser(user_id: number) {
    return this.httpClient.get<UserAddress[]>(
      environment.API_URL + `userAddress/all/${user_id}`,
    ).toPromise();
  }

  async getById(id: number) {
    return this.httpClient.get<UserAddress[]>(
      environment.API_URL + `userAddress/one/${id}`,
    ).toPromise();
  }

  async getByProps(user_id: number, address_id: number) {
    return this.httpClient.get<UserAddress[]>(
      environment.API_URL + `userAddress/one/${user_id}/${address_id}`,
    ).toPromise();
  }

  async update(props: UserAddress) {
    const promise = await this.httpClient.put<UserAddress>(
      environment.API_URL + 'userAddress',
      {
        id: props.id,
        user_id: props.user_id,
        address_id: props.address_id
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
      environment.API_URL + `userAddress/${id}`,
      {observe: "response"}
    ).toPromise();

    return promise.status === 200;
  }
}
