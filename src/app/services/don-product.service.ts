import { Injectable } from '@angular/core';
import {Don, DonCreation} from "../models/don.model";
import {EMPTY, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {DonProduct, DonProductCreation} from "../models/donProduct.model";

@Injectable({
  providedIn: 'root'
})
export class DonProductService {

  constructor(private httpClient: HttpClient) { }

  async getOne(id: number){
    return await this.httpClient.get<DonProduct>(
      environment.API_URL + `donProduct/one/${id}`
    ).toPromise();
  }

  async getAllByDon(id: number){
    return await this.httpClient.get<DonProduct[]>(
      environment.API_URL + `donProduct/all/${id}`
    ).toPromise();
  }

  async create(props: DonProductCreation) {
    const promise = await this.httpClient.post<DonProduct>(
      environment.API_URL + 'donProduct/',
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

  async update(props: DonProduct){
    const promise = await this.httpClient.put<DonProduct>(
      environment.API_URL + 'donProduct/',
      {
        id: props.id,
        don_id: props.don_id,
        product_id: props.product_id
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
      environment.API_URL + `donProduct/${id}`,
      {observe: 'response'}
    ).toPromise();
    return promise.status === 200;
  }
}
