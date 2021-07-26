export interface UserAddressCreation{
  user_id?: number;
  address_id?: number;
}

export class UserAddress{
  id: number;
  user_id?: number;
  address_id?: number;

  constructor(id: number, user_id: number, address_id: number) {
    this.id = id;
    this.user_id = user_id;
    this.address_id = address_id;
  }
}
