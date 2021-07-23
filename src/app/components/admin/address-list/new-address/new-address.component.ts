import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AddressService} from "../../../../services/address.service";

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.scss']
})
export class NewAddressComponent implements OnInit {

  addressForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private addressService: AddressService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addressForm = this.formBuilder.group({
      // name: [this.mediaType.name, Validators.pattern(/^(?!(this.mediaType.name)).*$/ )]
      name: ['', [Validators.required]],
      number: ['', [Validators.required]],
      way: ['', [Validators.required]],
      complement_way: [''],
      postal_code: ['', [Validators.required]],
      city: ['', [Validators.required]]
    });
  }

  async onSubmitForm() {
    const value = this.addressForm.value;
    // console.log(name);
    const res = await this.addressService.create({
      ...value
    });
    if (res !== null) {
      this.router.navigate(['/admin/address']);
    } else {
      alert("Error of creation");
    }
  }
}
