import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MediaTypeService} from "../../../../services/media-type.service";

@Component({
  selector: 'app-new-media-type',
  templateUrl: './new-media-type.component.html',
  styleUrls: ['./new-media-type.component.scss']
})
export class NewMediaTypeComponent implements OnInit {

  mediaTypeForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private mediaTypeService: MediaTypeService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.mediaTypeForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  async onSubmitForm() {
    const {name} = this.mediaTypeForm.value;
    // console.log(name);
    const res = await this.mediaTypeService.create({
      name
    });
    if (res !== null){
      this.router.navigate(['/admin/media-type']);
    }else{
      alert("Error of creation");
    }
  }

}
