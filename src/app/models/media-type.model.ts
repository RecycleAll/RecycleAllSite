export interface MediaTypeCreation{
  name: string;
}

export class MediaType{
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
