export interface EntrepotCreation {
  isAtelier: boolean;
  name: string;
  address_id: number;
}

export class Entrepot {
  id: number;
  isAtelier: boolean;
  name: string;
  address_id: number;

  constructor(id: number, isAtelier: boolean, name: string, address_id: number) {
    this.id = id;
    this.isAtelier = isAtelier;
    this.name = name;
    this.address_id = address_id;
  }
}
