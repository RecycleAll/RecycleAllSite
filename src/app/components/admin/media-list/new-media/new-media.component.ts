import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MediaType} from "../../../../models/media-type.model";
import {Subscription} from "rxjs";
import {MediaTypeService} from "../../../../services/media-type.service";
import {MediaService} from "../../../../services/media.service";
import {Router} from "@angular/router";
import {AuthUserService} from "../../../../services/auth-user.service";
import {Session} from "../../../../models/session.model";

@Component({
  selector: 'app-new-media',
  templateUrl: './new-media.component.html',
  styleUrls: ['./new-media.component.scss']
})
export class NewMediaComponent implements OnInit {

  mediaForm !: FormGroup;

  mediaTypes: MediaType[] = [];
  mediaTypesSubscription!: Subscription;

  authSubscription!: Subscription;
  activeSession!: Session;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private mediaTypeService: MediaTypeService,
              private mediaService: MediaService,
              private authUserService: AuthUserService) { }

  async ngOnInit(): Promise<void> {
    await this.mediaTypesFetch();
    this.mediaTypesSubscription = this.mediaTypeService.mediaTypeSubject.subscribe(
      (mediaTypes: MediaType[]) => {
        this.mediaTypes = mediaTypes;
      }
    );
    this.mediaTypeService.emitMediaType();
    this.initSession();
    this.initForm();
  }

  initSession() {
    this.authSubscription = this.authUserService.sessionSubject.subscribe(
      (session: Session) => {
        this.activeSession = session
      }
    );
    this.authUserService.emitSession();
  }

  initForm() {
    this.mediaForm = this.formBuilder.group({
      name: ['', Validators.required],
      client_view: ['', Validators.required],
      media_type_id: ['', Validators.required],
      file: [null, Validators.required],
      fileSource: ['', Validators.required]

    });
  }

  async mediaTypesFetch() {
    await this.mediaTypeService.getAll();
  }

  uploadFile(event: Event) {

    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
    this.mediaForm.patchValue({
      fileSource: file
    });

  }

  async onSubmitForm() {
    // console.log(this.mediaForm.value);
    // console.log("file : ", this.mediaForm.value.file);
    // console.log("file : ", this.mediaForm.value.fileSource);

    let user_save = 0;
    if (this.activeSession !== undefined && this.activeSession.user_id !== undefined){
      user_save = this.activeSession.user_id;
    }else{
      alert("Error : user not connected");
      return;
    }

    const {name, client_view, media_type_id} = this.mediaForm.value;
    let file = this.mediaForm.value.fileSource;

    const res = await this.mediaService.create({
      name,
      client_view,
      path: undefined,
      media_type_id,
      user_save,
      mimetype: undefined
    });

    if (res == null){
      alert("Error of creation");
      return;
    }

    const resFile = await this.mediaService.uploadFile(file, res.id);

    if (resFile !== null) {
      this.router.navigate(['/admin/media']);
    }else{
      alert("Error of upload");
    }
  }

}
