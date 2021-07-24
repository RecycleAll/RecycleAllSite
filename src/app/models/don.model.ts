export interface DonCreation {
  date: Date;
  coin_win: number;
  user_id?: number;
}

export class Don {
  id: number;
  date: Date;
  coins_win: number;
  user_id?: number;

  constructor(id: number, date: Date, coins_win: number, user_id?: number) {
    this.id = id;
    this.date = date;
    this.coins_win = coins_win;
    this.user_id = user_id;
  }
}
