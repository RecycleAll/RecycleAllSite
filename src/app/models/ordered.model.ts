export interface OrderedCreation{
  price: number;
  coins_used: number;
  price_after_reduce: number;
  date: Date;
  billing_address?: number;
  user_id?: number;
  send_id?: number;
}


export class Ordered{
  id: number;
  price: number;
  coins_used: number;
  price_after_reduce: number;
  date: Date;
  billing_address?: number;
  user_id?: number;
  send_id?: number;

  constructor(id: number, price: number, coins_used: number, price_after_reduce: number, date: Date, billing_address: number, user_id: number, send_id: number) {
    this.id = id;
    this.price = price;
    this.coins_used = coins_used;
    this.price_after_reduce = price_after_reduce;
    this.date = date;
    this.billing_address = billing_address;
    this.user_id = user_id;
    this.send_id = send_id;
  }
}
