export interface AddressCreation{
  name: string;
  number: string;
  way: string;
  complement_way?: string;
  postal_code: string;
  city: string;
}


export class Address {
  id: number;
  name: string;
  number: string;
  way: string;
  complement_way?: string;
  postal_code: string;
  city: string;


  constructor(id: number, name: string, number: string, way: string, complement_way: string, postal_code: string, city: string) {
    this.id = id;
    this.name = name;
    this.number = number;
    this.way = way;
    this.complement_way = complement_way;
    this.postal_code = postal_code;
    this.city = city;
  }
}
