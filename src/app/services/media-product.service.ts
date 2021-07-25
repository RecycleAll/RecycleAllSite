import { Injectable } from '@angular/core';
import {MediaProduct, MediaProductCreation} from "../models/mediaProduct.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {EMPTY} from "rxjs";
import {Media} from "../models/media.model";

@Injectable({
  providedIn: 'root'
})
export class MediaProductService {

  constructor(private httpClient: HttpClient) { }

  async create(props: MediaProductCreation) {
    const promise = await this.httpClient.post<MediaProduct>(
      environment.API_URL + 'mediaProduct',
      {
        media_id: props.media_id,
        product_id: props.product_id
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
    return this.httpClient.get<MediaProduct[]>(
      environment.API_URL + 'mediaProduct/all'
    ).toPromise();
  }

  async getAllByProduct(product_id: number) {
    const promise = await this.httpClient.get<MediaProduct[]>(
      environment.API_URL + `mediaProduct/all/${product_id}`,
      {observe: 'response'}
    ).pipe(catchError(() => {
      return EMPTY;
    })).toPromise();

    if (promise.status === 200 && promise.body !== null){
      return promise.body;
    }
    return null;
  }

  async getById(id: number) {
    return this.httpClient.get<MediaProduct>(
      environment.API_URL + `mediaProduct/one/${id}`,
    ).toPromise();
  }

  async getOneByProps(media_id: number, product_id: number) {
    return this.httpClient.get<MediaProduct>(
      environment.API_URL + `mediaProduct/one/${media_id}/${product_id}`,
    ).toPromise();
  }

  async update(props: MediaProduct) {
    const promise = await this.httpClient.put<MediaProduct>(
      environment.API_URL + 'mediaProduct',
      {
        id: props.id,
        media_id: props.media_id,
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
      environment.API_URL + `mediaProduct/${id}`,
      {observe: 'response'}
    ).toPromise();

    return promise.status === 200;
  }
}
