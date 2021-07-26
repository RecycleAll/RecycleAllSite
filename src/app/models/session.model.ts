import {Product} from "./product.model";

export class Session {
  private _id: number
  private _token: string;
  private _user_id: number;
  private _card: Product[] = [];
  private _isAdmin: boolean = false;
  private _recycle_coin: number;

  constructor(id: number, token: string, user_id: number) {
    this._id = id;
    this._token = token;
    this._user_id = user_id;
    this._card = [];
    this._recycle_coin = 0;
  }

  get recycle_coin(): number {
    return this._recycle_coin;
  }

  set recycle_coin(value: number) {
    this._recycle_coin = value;
  }

  get isAdmin(): boolean {
    return this._isAdmin;
  }

  set isAdmin(value: boolean) {
    this._isAdmin = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  get user_id(): number {
    return this._user_id;
  }

  set user_id(value: number) {
    this._user_id = value;
  }

  get card(): Product[] {
    return this._card;
  }

  set card(products: Product[])  {
    this._card = products;
  }

  public addToCard(id_product: Product) {
    const index = this._card.findIndex(x => x.id === id_product.id)
    if (index === -1) {
      this._card.push(id_product)
    }
  }

  public supprFromCard(id_product: Product) {
    const index = this._card.findIndex(x => x.id === id_product.id)
    if (index != -1) {
      this._card.splice(index, 1)
    }
  }

}
