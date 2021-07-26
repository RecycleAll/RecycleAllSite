export class UserLogInProps {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export interface UserUpdate{
  id: number;
  firstname: string | null | undefined;
  lastname: string | null | undefined;
  password: string | null | undefined;
  email: string | null | undefined;
  recycle_coins: number | null | undefined;
  work_in?:number | null | undefined;
}

export class User{
  id: number;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  recycle_coins: number;
  work_in?:number;

  constructor(id: number, firstname: string, lastname: string, password: string, email: string, recycle_coins: number, work_in: number) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
    this.email = email;
    this.recycle_coins = recycle_coins;
    this.work_in = work_in;
  }
}
