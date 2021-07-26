import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MediaTypeService} from "../../../../services/media-type.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MediaType} from "../../../../models/media-type.model";

@Component({
  selector: 'app-media-type-update',
  templateUrl: './media-type-update.component.html',
  styleUrls: ['./media-type-update.component.scss']
})
export class MediaTypeUpdateComponent implements OnInit {

  mediaTypeForm!: FormGroup;
  mediaType!: MediaType;

  constructor(private formBuilder: FormBuilder,
              private mediaTypeService: MediaTypeService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.params['id'];
    await this.initMediaType(id);
    this.initForm();
  }

  async initMediaType(id: number) {
    this.mediaType = await this.mediaTypeService.getOne(id);
  }

  initForm() {
    this.mediaTypeForm = this.formBuilder.group({
      // name: [this.mediaType.name, Validators.pattern(/^(?!(this.mediaType.name)).*$/ )]
      name: [this.mediaType.name, [Validators.required]]
    });
  }

  async onSubmitForm() {
    const {name} = this.mediaTypeForm.value;
    const id = this.mediaType.id;

    const res = await this.mediaTypeService.update({
      id,
      name
    });

    if (res !== null) {
      this.router.navigate([`/admin/media-type/${id}`]);
    } else {
      alert("Error of update");
    }
  }

}
