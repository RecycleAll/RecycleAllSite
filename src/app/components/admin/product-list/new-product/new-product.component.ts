import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ProductsService} from "../../../../services/products.service";
import {Entrepot} from "../../../../models/entrepot.model";
import {EntrepotService} from "../../../../services/entrepot.service";
import {Product} from "../../../../models/product.model";
import {MediaType} from "../../../../models/media-type.model";
import {MediaService} from "../../../../services/media.service";
import {Media} from "../../../../models/media.model";
import {MediaTypeService} from "../../../../services/media-type.service";
import {MediaProductService} from "../../../../services/media-product.service";

interface MediaItem{
  mediaType?: MediaType;
  file?: File;
  media?: Media;
}

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  newProductForm!: FormGroup;
  entrepots: Entrepot[] = [];
  products: Product[] = [];

  fileList: FileList | null = null;
  currentMediaType?: MediaType;
  currentMedia?: Media;
  mediaTypes: MediaType[] = [];
  mediaItems: MediaItem[] = [];
  medias: Media[] = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private productService: ProductsService,
              private mediaService: MediaService,
              private mediaTypeService: MediaTypeService,
              private entrepotService: EntrepotService,
              private mediaProductService: MediaProductService) {
  }

  async entrepotFetch() {
    await this.entrepotService.getAll();
  }

  async productFetch() {
    await this.productService.getAll();
  }

  async mediaFetch() {
    await this.mediaService.getAll();
  }

  async mediaTypesFetch() {
    await this.mediaTypeService.getAll();
  }

  async ngOnInit() {
    await this.mediaFetch();
    this.mediaService.mediasSubject.subscribe(value => {
      this.medias = value;
    });
    this.mediaService.emitMedia();

    await this.mediaTypesFetch();
    this.mediaTypeService.mediaTypeSubject.subscribe(
      (mediaTypes: MediaType[]) => {
        this.mediaTypes = mediaTypes;
      }
    );
    this.mediaTypeService.emitMediaType();

    await this.entrepotFetch();
    this.entrepotService.entrepotSubject.subscribe(value => {
      this.entrepots = value;
    });
    this.entrepotService.emitEntrepot();

    await this.productFetch();
    this.productService.productsSubject.subscribe(value => {
      if(value !== undefined) {
        this.products = value;
      }
      else{
        this.products = [];
      }
      console.log(this.products);
    });
    this.productService.emitProduct();

    this.initForm();
  }

  setMediaType(mediaTypeID: string) {
    const id = Number(mediaTypeID);
    this.currentMediaType = this.mediaTypes.find(value => value.id === id);
  }

  setMedia(mediaID: string){
    const id = Number(mediaID);
    this.currentMedia = this.medias.find(value => value.id === id);
    console.log("media: "+this.currentMedia+" id: "+mediaID+"  "+id);
  }

  addMedia(){
    if(this.fileList !== null && this.currentMediaType !== undefined) {
      this.mediaItems.push({
        file: this.fileList[0],
        mediaType: this.currentMediaType
      });
    }
  }

  addMedia2(){
    this.mediaItems.push({
      mediaType: this.mediaTypes.find(value => value.id == this.currentMedia?.media_type_id),
      media: this.currentMedia
    });
  }

  removeMedia(media: MediaItem){
    const index = this.mediaItems.indexOf(media, 0);
    if (index > -1) {
      this.mediaItems.splice(index, 1);
    }
  }

  setFileList(event: Event){
    this.fileList = (event.target as HTMLInputElement).files;
  }

  initForm() {
    this.newProductForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      serial_number: ['', [Validators.required]],
      price: ['', [Validators.required]], //TODO : not required
      piece_of: [null],
      entrepot_id: [null]
    });
  }

  async onSubmitForm() {
    const {name, description, serial_number, price, piece_of, entrepot_id} = this.newProductForm.value;

    let args;
    if (piece_of) {
      args = {
        name,
        description,
        serial_number,
        price,
        piece_of,
        entrepot_store_id: entrepot_id
      }
    } else {
      args = {
        name,
        description,
        serial_number,
        price,
        entrepot_store_id: entrepot_id
      }
    }

    const prod = await this.productService.create(args);

    if(!prod){
      alert("Can't create Donation")
      return
    }

    console.log("test: "+this.mediaItems);
    for(let mediaItem of this.mediaItems){

      if(mediaItem.file && mediaItem.mediaType) {
        console.log("posting: " + mediaItem.file.name);
        const media = await this.mediaService.create({
          name: mediaItem.file.name,
          client_view: true,
          path: undefined,
          media_type_id: mediaItem.mediaType.id,
          user_save: 1,
          mimetype: undefined
        });

        if (media == null) {
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

      }else{

        if( !mediaItem.media){
          alert("Error media is empty");
          return;
        }

        await this.mediaProductService.create({
          media_id: mediaItem.media.id,
          product_id: prod.id
        });
      }

    }

    this.router.navigate(['/admin/product']);
  }

}
