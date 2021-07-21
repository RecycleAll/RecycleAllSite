import { Component, OnInit } from '@angular/core';
import {MediaType} from "../../../models/media-type.model";
import {Subscription} from "rxjs";
import {MediaTypeService} from "../../../services/media-type.service";

@Component({
  selector: 'app-media-type-list',
  templateUrl: './media-type-list.component.html',
  styleUrls: ['./media-type-list.component.scss']
})
export class MediaTypeListComponent implements OnInit {

  mediaTypes: MediaType[] = [];
  mediaTypesSubscription!: Subscription;

  constructor(private mediaTypeService: MediaTypeService) { }

  async ngOnInit(): Promise<void> {
    await this.mediaTypesFetch();
    this.mediaTypesSubscription = this.mediaTypeService.mediaTypeSubject.subscribe(
      (mediaTypes: MediaType[]) => {
        this.mediaTypes = mediaTypes;
      }
    );
    this.mediaTypeService.emitMediaType();
  }

  async mediaTypesFetch() {
    await this.mediaTypeService.getAll();
  }

}
