export interface MediaProductCreation {
  media_id?: number;
  product_id?: number;
}

export class MediaProduct {
  id: number;
  media_id?: number;
  product_id?: number;

  constructor(id: number, media_id: number, product_id: number) {
    this.id = id;
    this.media_id = media_id;
    this.product_id = product_id;
  }
}
