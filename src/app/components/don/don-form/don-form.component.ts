import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../../models/product.model";
import {Router} from "@angular/router";
import {ProductsService} from "../../../services/products.service";
import {DonService} from "../../../services/don.service";
import {Session} from "../../../models/session.model";
import {AuthUserService} from "../../../services/auth-user.service";
import {MediaType} from "../../../models/media-type.model";
import {MediaTypeService} from "../../../services/media-type.service";
import {MediaService} from "../../../services/media.service";
import {MediaProductService} from "../../../services/media-product.service";

interface MediaItem{
  mediaType: MediaType;
  file: File;
}

@Component({
  selector: 'app-don-form',
  templateUrl: './don-form.component.html',
  styleUrls: ['./don-form.component.scss']
})
export class DonFormComponent implements OnInit {

  newProductForm!: FormGroup;
  product!: Product;
  session?: Session;

  fileList: FileList | null = null;

  currentMediaType?: MediaType;
  mediaTypes: MediaType[] = [];
  mediaItems: MediaItem[] = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private productService: ProductsService,
              private authUserSession: AuthUserService,
              private mediaTypeService: MediaTypeService,
              private mediaService: MediaService,
              private donService: DonService,
              private mediaProductService: MediaProductService) {
  }

  async ngOnInit() {

    if( this.authUserSession.isAuth() ){
      this.session = this.authUserSession.getSession();
    }

    await this.mediaTypesFetch();
    this.mediaTypeService.mediaTypeSubject.subscribe(
      (mediaTypes: MediaType[]) => {
        this.mediaTypes = mediaTypes;
      }
    );
    this.mediaTypeService.emitMediaType();

    this.initForm();
  }

  async mediaTypesFetch() {
    await this.mediaTypeService.getAll();
  }

  setMediaType(product: string) {
    const id = Number(product);
    this.currentMediaType = this.mediaTypes.find(value => value.id === id);
  }

  addMedia(){
    if(this.fileList !== null && this.currentMediaType !== undefined) {
      this.mediaItems.push({
        file: this.fileList[0],
        mediaType: this.currentMediaType
      });
    }
  }

  removeMedia(media: MediaItem){
    const index = this.mediaItems.indexOf(media, 0);
    if (index > -1) {
      this.mediaItems.splice(index, 1);
    }
  }

  initForm() {
    this.newProductForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      serial_number: [''],
      piece_of: [null],
      file: [null]
    });
  }

  setFileList(event: Event){
    this.fileList = (event.target as HTMLInputElement).files;
  }

  async onSubmitForm() {
    const {name, description, serial_number, piece_of, entrepot_id} = this.newProductForm.value;

    if(!this.session){
      return
    }

    const don = await this.donService.create({
      user_id: this.session.user_id,
      coin_win: 0,
      date: new Date()
    });

    if(!don){
      alert("Can't create Donation")
      return
    }

    console.log("donId: "+don.id);
    let args;
    if (piece_of) {
      args = {
        name,
        description,
        serial_number,
        price: undefined,
        piece_of,
        entrepot_store_id: entrepot_id,
        don_id: don.id
      }
    } else {
      args = {
        name,
        description,
        serial_number,
        price: undefined,
        entrepot_store_id: entrepot_id,
        don_id: don.id
      }
    }

    const prod = await this.productService.create(args);

    if(!prod){
      await this.donService.delete(don.id)
      alert("Can't create Donation")
      return
    }

    console.log("test: "+this.mediaItems);
    for(let mediaItem of this.mediaItems){
      console.log("posting: "+mediaItem.file.name);
      const media = await this.mediaService.create({
        name: mediaItem.file.name,
        client_view: true,
        path: undefined,
        media_type_id: mediaItem.mediaType.id,
        user_save: 1,
        mimetype: undefined
      });

      if (media == null){
        alert("Error of creation");
        return;
      }

      const resFile = await this.mediaService.uploadFile(mediaItem.file, media.id);

      if (!resFile) {
        alert("Can't upload file");
        await this.mediaService.delete(media.id);
        return;
      }

      await this.mediaProductService.create({
        media_id: media.id,
        product_id: prod.id
      });

    }

    this.router.navigate(['/donation']);
  }

}
