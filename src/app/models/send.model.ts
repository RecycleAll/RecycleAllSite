export interface SendCreation {
  date: Date;
  send_type: number;
  status: number;
  delivery_address?: number;
}

export class Send {
  id: number;
  date: Date;
  send_type: number;
  status: number;
  delivery_address?: number;

  constructor(id: number, date: Date, send_type: number, status: number, delivery_address: number) {
    this.id = id;
    this.date = date;
    this.send_type = send_type;
    this.status = status;
    this.delivery_address = delivery_address;
  }
}
