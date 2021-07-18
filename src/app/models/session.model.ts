export class Session {
  private _id: number
  private _token: string;
  private _user_id: number;

  constructor(id: number, token: string, user_id: number) {
    this._id = id;
    this._token = token;
    this._user_id = user_id;
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
}
