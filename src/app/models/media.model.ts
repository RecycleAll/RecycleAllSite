export interface MediaCreation{
  name: string;
  path?: string;
  client_view: boolean;
  media_type_id?: number;
  user_save?: number;
}

export class Media{

  id: number;
  name: string;
  path?: string;
  client_view: boolean;
  media_type_id?: number;
  user_save?: number;


  constructor(id: number, name: string, path: string, client_view: boolean, media_type_id: number, user_save: number) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.client_view = client_view;
    this.media_type_id = media_type_id;
    this.user_save = user_save;
  }
}
