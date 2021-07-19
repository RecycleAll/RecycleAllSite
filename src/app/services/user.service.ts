import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  async getOne(id: number) {
    return await this.httpClient.get<User>(
      environment.API_URL + `auth/${id}`,
    ).toPromise();
  }
}
