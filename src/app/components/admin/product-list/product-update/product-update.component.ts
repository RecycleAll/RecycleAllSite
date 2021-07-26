import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../../../models/product.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../../../../services/products.service";
import {Entrepot} from "../../../../models/entrepot.model";
import {EntrepotService} from "../../../../services/entrepot.service";
import {Media} from "../../../../models/media.model";
import {MediaType} from "../../../../models/media-type.model";
import {MediaTypeService} from "../../../../services/media-type.service";
import {MediaProductService} from "../../../../services/media-product.service";
import {MediaService} from "../../../../services/media.service";
import {MediaProduct} from "../../../../models/mediaProduct.model";


interface MediaItem {
  mediaType?: MediaType;
  file?: File;
  media?: Media;
  mediaProduct?: MediaProduct;
}

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {

  productForm!: FormGroup;
  product!: Product;
  entrepots: Entrepot[] = [];
  products: Product[] = [];

  fileList: FileList | null = null;

  currentMediaType?: MediaType;
  currentMedia?: MediaItem;

  allMedia: MediaItem[] = [];
  mediaTypes: MediaType[] = [];

  linkedMedia: MediaItem[] = [];
  addedMedia: MediaItem[] = [];
  removedMedia: MediaItem[] = [];

  constructor(private formBuilder: FormBuilder,
              private productService: ProductsService,
              private entrepotService: EntrepotService,
              private route: ActivatedRoute,
              private router: Router,
              private mediaService: MediaService,
              private mediaTypeService: MediaTypeService,
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

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.params['id'];

    await this.mediaTypesFetch();
    this.mediaTypeService.mediaTypeSubject.subscribe(
      (mediaTypes: MediaType[]) => {
        this.mediaTypes = mediaTypes;
      }
    );
    this.mediaTypeService.emitMediaType();

    await this.mediaFetch();
    this.mediaService.mediasSubject.subscribe(value => {
      this.allMedia = value.map(value => {
        return {
          media: value,
          mediaType: this.mediaTypes.find(value1 => value1.id === value.media_type_id)
        }
      });

    });
    this.mediaService.emitMedia();

    await this.entrepotFetch();
    this.entrepotService.entrepotSubject.subscribe(value => {
      this.entrepots = value;
    });
    this.entrepotService.emitEntrepot();

    await this.productFetch();
    this.productService.productsSubject.subscribe(value => {
      this.products = value;
    });
    this.productService.emitProduct();

    await this.initProduct(id);
    this.initForm();
  }

  async initProduct(id: number) {
    this.product = await this.productService.getOne(id);

    const mediaProducts = await this.mediaProductService.getAllByProduct(this.product.id);

    if (mediaProducts) {
      const tmp: MediaItem[] = mediaProducts.map(mediaProduct => {
        const mediaItem = this.allMedia.find(media => media.media?.id === mediaProduct.media_id);
        if (mediaItem) {
          return {
            mediaProduct,
            media: mediaItem.media,
            mediaType: undefined,
            file: undefined
          };
        } else {
          return this.allMedia[0];
        }
      });

      if (tmp) {
        this.linkedMedia = tmp;
      } else {
        this.linkedMedia = [];
      }
    } else {
      this.linkedMedia = [];
    }

  }

  setMediaType(mediaTypeID: string) {
    const id = Number.parseInt(mediaTypeID);
    this.currentMediaType = this.mediaTypes.find(value => value.id === id);
  }

  setMedia(mediaID: string) {
    const id = Number(mediaID);
    this.currentMedia = this.allMedia.find(value => value.media?.id === id);
  }

  addMedia() {
    if (this.fileList !== null && this.currentMediaType !== undefined) {
      this.addedMedia.push({
        file: this.fileList[0],
        mediaType: this.currentMediaType
      });
    }
  }

  addMedia2() {
    if (!this.currentMedia) {
      return;
    }

    let index = this.allMedia.indexOf(this.currentMedia, 0);
    if (index > -1) {
      this.allMedia.splice(index, 1);
      this.addedMedia.push(this.currentMedia);
      return;
    }

    index = this.removedMedia.indexOf(this.currentMedia, 0);
    if (index > -1) {
      this.removedMedia.splice(index, 1);
      this.linkedMedia.push(this.currentMedia);
    }
  }

  removeMedia(mediaItem: MediaItem) {
    let index = this.linkedMedia.indexOf(mediaItem, 0);
    if (index > -1) {
      this.linkedMedia.splice(index, 1);
      this.removedMedia.push(mediaItem);
      return;
    }

    index = this.addedMedia.indexOf(mediaItem, 0);
    if (index > -1) {
      this.addedMedia.splice(index, 1);
      if (mediaItem.media)
        this.allMedia.push(mediaItem);
    }
  }

  setFileList(event: Event) {
    this.fileList = (event.target as HTMLInputElement).files;
  }

  initForm() {
    this.productForm = this.formBuilder.group({
      name: [this.product.name, [Validators.required]],
      description: [this.product.description, [Validators.required]],
      serial_number: [this.product.serial_number],
      price: [this.product.price],
      piece_of: [this.product.piece_of],
      entrepot_id: [this.product.entrepot_store_id]
    });
  }

  async onSubmitForm() {
    let {name, description, serial_number, price, piece_of, entrepot_id} = this.productForm.value;

    if (piece_of !== null && piece_of.length <= 0) {
      piece_of = null;
    }

    if (entrepot_id !== null && entrepot_id.length <= 0) {
      entrepot_id = null;
    }

    const prod = await this.productService.update({
      id: this.product.id,
      name,
      description,
      serial_number,
      price,
      piece_of,
      entrepot_store_id: entrepot_id
    });

    for (let mediaItemToAdd of this.addedMedia) {

      if (mediaItemToAdd.file && mediaItemToAdd.mediaType) {

        const media = await this.mediaService.create({
          name: mediaItemToAdd.file.name,
          client_view: true,
          path: undefined,
          media_type_id: mediaItemToAdd.mediaType.id,
          user_save: 1,
          mimetype: undefined
        });

        if (media == null) {
          alert("Error of creation");
          return;
        }

        const resFile = await this.mediaService.uploadFile(mediaItemToAdd.file, media.id);

        if (!resFile) {
          alert("Can't upload file");
          await this.mediaService.delete(media.id);
          return;
        }

        await this.mediaProductService.create({
          media_id: media.id,
          product_id: prod.id
        });
      } else {
        if (!mediaItemToAdd.media) {
          alert("Error media is empty");
          return;
        }

        await this.mediaProductService.create({
          media_id: mediaItemToAdd.media.id,
          product_id: prod.id
        });
      }

    }

    for(let mediaItemToRemove of this.removedMedia){

      if (!mediaItemToRemove.mediaProduct) {
        alert("Error mediaProduct is empty");
        return;
      }

      await this.mediaProductService.delete(mediaItemToRemove.mediaProduct.id);

    }

    if (prod !== null) {
      this.router.navigate(['/admin/product']);
    } else {
      alert("Error of update");
    }
  }

}
