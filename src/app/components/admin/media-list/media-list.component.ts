import { Component, OnInit } from '@angular/core';
import {MediaType} from "../../../models/media-type.model";
import {Subscription} from "rxjs";
import {Media} from "../../../models/media.model";
import {MediaTypeService} from "../../../services/media-type.service";
import {MediaService} from "../../../services/media.service";

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss']
})
export class MediaListComponent implements OnInit {

  mediaTypes: MediaType[] = [];
  mediaTypesSubscription!: Subscription;

  medias: Media[] = [];
  mediaSubscription!: Subscription;

  constructor(private mediaTypeService: MediaTypeService,
              private mediaService: MediaService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.mediaTypesFetch();
    this.mediaTypesSubscription = this.mediaTypeService.mediaTypeSubject.subscribe(
      (mediaTypes: MediaType[]) => {
        this.mediaTypes = mediaTypes;
      }
    );
    this.mediaTypeService.emitMediaType();

    await this.mediasFetch();
    this.mediaSubscription = this.mediaService.mediasSubject.subscribe(
      (medias: Media[]) => {
        this.medias = medias;
      }
    );
    this.mediaService.emitMedia();
  }

  async mediaTypesFetch() {
    await this.mediaTypeService.getAll();
  }

  async mediasFetch() {
    await this.mediaService.getAll();
  }

  getMediaType(media: Media): MediaType{
    return <MediaType>this.mediaTypes.find(
      mediaType => mediaType.id === media.media_type_id
    )
  }

}
