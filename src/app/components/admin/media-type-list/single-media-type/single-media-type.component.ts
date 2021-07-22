import { Component, OnInit } from '@angular/core';
import {MediaType} from "../../../../models/media-type.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MediaTypeService} from "../../../../services/media-type.service";

@Component({
  selector: 'app-single-media-type',
  templateUrl: './single-media-type.component.html',
  styleUrls: ['./single-media-type.component.scss']
})
export class SingleMediaTypeComponent implements OnInit {

  mediaType !: MediaType;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private mediaTypeService: MediaTypeService
              ) { }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.params['id'];
    await this.initMediaType(id);
  }

  async initMediaType(id: number) {
    this.mediaType = await this.mediaTypeService.getOne(id);
  }

  async onDelete() {
    const isDelete = await this.mediaTypeService.delete(this.mediaType.id);
    if(isDelete){
      this.router.navigate(['/admin/media-type'])
    }else{
      alert("Is not delete !");
    }
  }

  onUpdate() {
    this.router.navigate([`admin/media-type-update/${this.mediaType.id}`])
  }

}
