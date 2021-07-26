import {Injectable} from '@angular/core';
import {Coin} from "../models/coin.model";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CoinService {

  constructor(private httpClient: HttpClient) { }

  async getRation(){
    return await this.httpClient.get<Coin>(
      environment.API_URL + `coin`
    ).toPromise();
  }
}
