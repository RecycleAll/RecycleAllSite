import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Media} from "../../../../models/media.model";
import {MediaTypeService} from "../../../../services/media-type.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MediaService} from "../../../../services/media.service";
import {MediaType} from "../../../../models/media-type.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-media-update',
  templateUrl: './media-update.component.html',
  styleUrls: ['./media-update.component.scss']
})
export class MediaUpdateComponent implements OnInit {

  mediaForm!: FormGroup;
  media!: Media;

  mediaTypes: MediaType[] = [];
  mediaTypesSubscription!: Subscription;

  constructor(private formBuilder: FormBuilder,
              private mediaTypeService: MediaTypeService,
              private mediaService: MediaService,
              private route: ActivatedRoute,
              private router: Router) { }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.params['id'];

    await this.mediaTypesFetch();
    this.mediaTypesSubscription = this.mediaTypeService.mediaTypeSubject.subscribe(
      (mediaTypes: MediaType[]) => {
        this.mediaTypes = mediaTypes;
      }
    );
    this.mediaTypeService.emitMediaType();

    await this.initMedia(id);

    this.initForm();
  }

  async mediaTypesFetch() {
    await this.mediaTypeService.getAll();
  }

  async initMedia(id: number) {
    this.media = await this.mediaService.getOne(id);
  }

  initForm() {
    // @ts-ignore
    const mediaType = this.mediaTypes.find((value: MediaType) => {
      if (value.id === this.media.media_type_id){
        return value.name
      }
    });
    console.log(mediaType);
    this.mediaForm = this.formBuilder.group({
      name: [this.media.name, Validators.required],
      client_view: [this.media.client_view, Validators.required],
      media_type_id: [this.media.media_type_id, Validators.required],
    });
  }

  async onSubmitForm() {
    console.log(this.mediaForm.value);
    const {name, client_view, media_type_id} = this.mediaForm.value;
    const id = this.media.id;
    const res = await this.mediaService.update({
      id,
      name,
      media_type_id,
      client_view,
    });

    if(res !== null){
      this.router.navigate([`/admin/media/${id}`]);
    } else {
      alert("Error of update")
    }
  }
}
