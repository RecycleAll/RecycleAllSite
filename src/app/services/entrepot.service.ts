import { Injectable } from '@angular/core';
import {Entrepot, EntrepotCreation} from "../models/entrepot.model";
import {EMPTY, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EntrepotService {

  private entrepots: Entrepot[] = []
  public entrepotSubject = new Subject<Entrepot[]>();

  constructor(private httpClient: HttpClient) { }

  emitEntrepot() {
    this.entrepotSubject.next(this.entrepots);
  }

  async getOne(id: number){
    return await this.httpClient.get<Entrepot>(
      environment.API_URL + `entrepot/${id}`
    ).toPromise();
  }

  async getAll() {
    const promise = await this.httpClient.get<Entrepot[]>(
      environment.API_URL + 'entrepot/',
      {observe: 'response'}
    ).pipe(catchError(() => {
      return EMPTY;
    })).toPromise();

    if (promise.status === 200 && promise.body != null){
      console.log(promise.body);
      this.entrepots = promise.body;
    }
    this.emitEntrepot();
  }

  async create(props: EntrepotCreation) {
    const promise = await this.httpClient.post<Entrepot>(
      environment.API_URL + 'entrepot/',
      {
        isAtelier: props.isAtelier,
        name: props.name,
        address_id: props.address_id
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

  async update(props: Entrepot){
    const promise = await this.httpClient.put<Entrepot>(
      environment.API_URL + 'entrepot/',
      {
        id: props.id,
        isAtelier: props.isAtelier,
        name: props.name,
        address_id: props.address_id
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
      environment.API_URL + `entrepot/${id}`,
      {observe: 'response'}
    ).toPromise();
    return promise.status === 200;
  }

}
