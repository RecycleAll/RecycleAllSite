export interface DonProductCreation {
  product_id: number;
  don_id: number;
}

export class DonProduct {
  id: number;
  product_id: number;
  don_id?: number;

  constructor(id: number, product_id: number, don_id: number) {
    this.id = id;
    this.product_id = product_id;
    this.don_id = don_id;
  }
}
