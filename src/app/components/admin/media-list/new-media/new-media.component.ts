import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MediaType} from "../../../../models/media-type.model";
import {Subscription} from "rxjs";
import {MediaTypeService} from "../../../../services/media-type.service";
import {MediaService} from "../../../../services/media.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-media',
  templateUrl: './new-media.component.html',
  styleUrls: ['./new-media.component.scss']
})
export class NewMediaComponent implements OnInit {

  // TODO
  mediaForm !: FormGroup;

  mediaTypes: MediaType[] = [];
  mediaTypesSubscription!: Subscription;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private mediaTypeService: MediaTypeService,
              private mediaService: MediaService) { }

  async ngOnInit(): Promise<void> {
    await this.mediaTypesFetch();
    this.mediaTypesSubscription = this.mediaTypeService.mediaTypeSubject.subscribe(
      (mediaTypes: MediaType[]) => {
        this.mediaTypes = mediaTypes;
      }
    );
    this.mediaTypeService.emitMediaType();

    this.initForm();
  }

  initForm() {
    this.mediaForm = this.formBuilder.group({
      name: ['', Validators.required],
      client_view: ['', Validators.required],
      media_type_id: ['', Validators.required],
      file: []
    });
  }

  async mediaTypesFetch() {
    await this.mediaTypeService.getAll();
  }

  async onSubmitForm() {
    console.log(this.mediaForm.value);
    console.log("file : ", this.mediaForm.value.file);
  }

}
