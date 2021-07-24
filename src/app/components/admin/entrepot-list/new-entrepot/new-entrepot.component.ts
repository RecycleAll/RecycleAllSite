import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {EntrepotService} from "../../../../services/entrepot.service";
import {Address} from "../../../../models/address.model";
import {AddressService} from "../../../../services/address.service";

@Component({
  selector: 'app-new-entrepot',
  templateUrl: './new-entrepot.component.html',
  styleUrls: ['./new-entrepot.component.scss']
})
export class NewEntrepotComponent implements OnInit {

  newEntrepotForm!: FormGroup;
  address: Address[] = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private entrepotService: EntrepotService,
              private addressService: AddressService) { }

  async addressFetch() {
    await this.addressService.getAll();
  }

  async ngOnInit() {
    await this.addressFetch();
    this.addressService.addressSubject.subscribe(value => {
      this.address = value;
    });
    this.addressService.emitAddress();

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
    const {name, isAtelier, address} = this.newEntrepotForm.value;
    await this.entrepotService.create({
      name,
      isAtelier,
      address_id:address,
    });

    this.router.navigate(['/admin/entrepot']);
  }

}
