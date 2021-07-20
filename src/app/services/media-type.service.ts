import { Injectable } from '@angular/core';
import {MediaType, MediaTypeCreation} from "../models/media-type.model";
import {EMPTY, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Address} from "../models/address.model";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MediaTypeService {

  private mediaTypes : MediaType[] = [];
  public mediaTypeSubject = new Subject<MediaType[]>();

  constructor(private httpClient: HttpClient) { }

  emitMediaType() {
    this.mediaTypeSubject.next(this.mediaTypes);
  }

  async getOne(id: number){
    return await this.httpClient.get<Address>(
      environment.API_URL + `mediaType/${id}`
    ).toPromise();
  }

  async getAll() {
    const promise = await this.httpClient.get<MediaType[]>(
      environment.API_URL + 'mediaType/',
      {observe: 'response'}
    ).pipe(catchError(() => {
      return EMPTY;
    })).toPromise();

    if (promise.status === 200 && promise.body != null){
      this.mediaTypes = promise.body;
    }
    this.emitMediaType();
  }

  async create(props: MediaTypeCreation){
    const promise = await this.httpClient.post<MediaType>(
      environment.API_URL + 'mediaType/',
      {
        name: props.name
      }, {observe: 'response'}
    ).pipe(catchError(() => {
      return EMPTY;
    })).toPromise();

    if (promise.status === 201 && promise.body !== null){
      return promise.body;
    }
    return null;
  }

  async update(props: MediaType){
    const promise = await this.httpClient.put<MediaType>(
      environment.API_URL + 'mediaType/',
      {
        id: props.id,
        name: props.name
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
      environment.API_URL + `mediaType/${id}`,
      {observe: 'response'}
    ).toPromise();
    return promise.status === 200;
  }

}
