export class UserLogInProps {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
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
