import {Injectable} from '@angular/core';
import {Media, MediaCreation} from "../models/media.model";
import {EMPTY, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private medias: Media[] = [];
  public mediasSubject = new Subject<Media[]>();

  constructor(private httpClient: HttpClient) {
  }

  emitMedia() {
    this.mediasSubject.next(this.medias);
  }

  async getOne(id: number) {
    return await this.httpClient.get<Media>(
      environment.API_URL + `media/${id}`,
    ).toPromise();
  }

  async getAll() {
    const promise = await this.httpClient.get<Media[]>(
      environment.API_URL + 'media/',
      {observe: 'response'}
    ).pipe(catchError(() => {
      return EMPTY;
    })).toPromise();

    if (promise.status === 200 && promise.body != null) {
      this.medias = promise.body;
    }
    this.emitMedia();
  }

  async create(props: MediaCreation) {
    const promise = await this.httpClient.post<Media>(
      environment.API_URL + 'media/',
      {
        name: props.name,
        path: props.path,
        client_view: props.client_view,
        media_type_id: props.media_type_id,
        user_save: props.user_save
      },
      {observe: 'response'}
    ).pipe(catchError(() => {
      return EMPTY;
    })).toPromise();

    if (promise.status === 201 && promise.body !== null) {
      return promise.body;
    }
    return null;
  }

  async uploadFile(file: string, id: number){
    const formData: FormData = new FormData();
    formData.append("uploaded_file", file);
    formData.append("id", id.toString())

    const promise = await this.httpClient.post<Media>(
      environment.API_URL + 'media/file',
      formData,
      {observe: 'response'}
    ).pipe(catchError(() => {
      return EMPTY;
    })).toPromise();

    if (promise.status === 200 && promise.body !== null){
      return promise.body;
    }
    return null;
  }

  async update(props: Media) {
    const promise = await this.httpClient.put<Media>(
      environment.API_URL + 'media/',
      {
        id: props.id,
        name: props.name,
        path: props.name,
        client_view: props.client_view,
        media_type_id: props.media_type_id,
        user_save: props.user_save
      },
      {observe: 'response'}
    ).pipe(catchError(() => {
      return EMPTY;
    })).toPromise();

    if (promise.status === 200 && promise.body !== null) {
      return promise.body;
    }
    return null;
  }

  async delete(id: number) {
    const promise = await this.httpClient.delete(
      environment.API_URL + `media/${id}`,
      {observe: 'response'}
    ).toPromise();
    return promise.status === 200;
  }
}
