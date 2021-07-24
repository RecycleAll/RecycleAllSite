import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MediaTypeService} from "../../../../services/media-type.service";
import {environment} from "../../../../../environments/environment";
import {Media} from "../../../../models/media.model";
import {MediaService} from "../../../../services/media.service";
import {MediaType} from "../../../../models/media-type.model";

@Component({
  selector: 'app-single-media',
  templateUrl: './single-media.component.html',
  styleUrls: ['./single-media.component.scss']
})
export class SingleMediaComponent implements OnInit {

  mediaType!: MediaType;

  urlImg!: string;
  media!: Media;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private mediaService: MediaService,
              private mediaTypeService: MediaTypeService) { }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.params['id'];
    this.urlImg = environment.API_URL + `media/file/${id}`
    await this.initMedia(id);
    if (this.media.media_type_id != undefined){
      await this.initMediaType(this.media.media_type_id);
    }
  }

  async initMedia(id: number) {
    this.media = await this.mediaService.getOne(id);
  }

  async initMediaType(id: number) {
    this.mediaType = await this.mediaTypeService.getOne(id);
  }

  async onDelete() {
    const isDelete = await this.mediaService.delete(this.media.id);
    if(isDelete){
      this.router.navigate(['/admin/media'])
    }else{
      alert("Is not delete !");
    }
  }

  onUpdate() {
    this.router.navigate([`admin/media-update/${this.media.id}`]);
  }

}
