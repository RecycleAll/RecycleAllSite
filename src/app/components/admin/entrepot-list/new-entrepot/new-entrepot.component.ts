import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {EntrepotService} from "../../../../services/entrepot.service";

@Component({
  selector: 'app-new-entrepot',
  templateUrl: './new-entrepot.component.html',
  styleUrls: ['./new-entrepot.component.scss']
})
export class NewEntrepotComponent implements OnInit {

  newEntrepotForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private entrepotService: EntrepotService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.newEntrepotForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      isAtelier: [null],
      address: ['', [Validators.required]]
    });
  }

  async onSubmitForm() {
    console.log("test");
    const {name, isAtelier, address} = this.newEntrepotForm.value;
    await this.entrepotService.create({
      name,
      isAtelier,
      address_id:1,
    });

    this.router.navigate(['/admin/entrepot']);

  }

}
