import { Injectable } from '@angular/core';
import {Product, ProductCreation} from "../models/product.model";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: Product[] = [];
  productsSubject = new Subject<Product[]>()

  constructor(
    private httpClient: HttpClient
  ) { }

  emitProduct(){
    this.productsSubject.next(this.products);
  }

  async create(props: ProductCreation){
    return this.httpClient.post<Product>(
      environment.API_URL + "product/",
      {
        name: props.name,
        description: props.description,
        serial_number: props.serial_number,
        price: props.price,
        piece_of: props.piece_of,
        entrepot_store_id: props.entrepot_store_id
      }
    ).toPromise();
  }

  async getAll() {
    this.products = await this.httpClient.get<Product[]>(
      environment.API_URL + "product/"
    ).toPromise();
    this.emitProduct();
  }

  async getOne(id: number) {
    return await this.httpClient.get<Product>(
      environment.API_URL + `product/${id}`,
    ).toPromise();
  }

  async update(props: Product) {

    return await this.httpClient.put<Product>(
      environment.API_URL + "product/",
      {
        id: props.id,
        name: props.name,
        description: props.description,
        serial_number: props.serial_number,
        price: props.price,
        piece_of: props.piece_of,
        entrepot_store_id: props.entrepot_store_id
      }
    ).toPromise();
  }

  async delete(id: number) {
    const promise =  await this.httpClient.delete(
      environment.API_URL + `product/${id}`,
      {observe: 'response'}
    ).toPromise();

    return promise.status === 200;
  }
}
