import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Address} from "../../../../models/address.model";
import {AddressService} from "../../../../services/address.service";

@Component({
  selector: 'app-address-update',
  templateUrl: './address-update.component.html',
  styleUrls: ['./address-update.component.scss']
})
export class AddressUpdateComponent implements OnInit {

  addressForm!: FormGroup;
  address!: Address;


  constructor(private formBuilder: FormBuilder,
              private addressService: AddressService,
              private route: ActivatedRoute,
              private router: Router) { }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.params['id'];
    await this.initAddress(id);
    console.log(this.address);
    this.initForm();
  }

  async initAddress(id: number) {
    this.address = await this.addressService.getOne(id);
  }

  initForm() {
    this.addressForm = this.formBuilder.group({
      // name: [this.mediaType.name, Validators.pattern(/^(?!(this.mediaType.name)).*$/ )]
      name: [this.address.name, [Validators.required]],
      number: [this.address.number, [Validators.required]],
      way: [this.address.way, [Validators.required]],
      complement_way: [this.address.complement_way],
      postal_code: [this.address.postal_code, [Validators.required]],
      city: [this.address.city, [Validators.required]]
    });
  }

  async onSubmitForm() {
    const value = this.addressForm.value;

    const res = await this.addressService.update({
      id: this.address.id,
      ...value
    });

    if (res !== null){
      this.router.navigate(['/admin/address']);
    }else{
      alert("Error of update");
    }
  }
}
