export interface ProductCreation{
  name: string;
  description: string;
  serial_number?: string;
  price?: number;
  piece_of?: number;
  entrepot_store_id?: number;
}

export class Product{

  id: number;
  name: string;
  description: string;
  serial_number?: string;
  price?: number;
  piece_of?: number;
  entrepot_store_id?: number;

  constructor(id: number, name: string, description: string, serial_number: string, price: number, piece_of: number, entrepot_store_id: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.serial_number = serial_number;
    this.price = price;
    this.piece_of = piece_of;
    this.entrepot_store_id = entrepot_store_id;
  }
}
