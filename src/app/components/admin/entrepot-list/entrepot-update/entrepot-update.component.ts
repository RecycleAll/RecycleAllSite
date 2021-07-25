import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Entrepot} from "../../../../models/entrepot.model";
import {EntrepotService} from "../../../../services/entrepot.service";
import {Address} from "../../../../models/address.model";
import {AddressService} from "../../../../services/address.service";

@Component({
  selector: 'app-entrepot-update',
  templateUrl: './entrepot-update.component.html',
  styleUrls: ['./entrepot-update.component.scss']
})
export class EntrepotUpdateComponent implements OnInit {

  entrepotForm!: FormGroup;
  entrepot!: Entrepot;
  address: Address[] = [];

  constructor(private formBuilder: FormBuilder,
              private entrepotService: EntrepotService,
              private route: ActivatedRoute,
              private router: Router,
              private addressService: AddressService) { }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.params['id'];
    await this.initEntrepot(id);

    await this.addressFetch();
    this.addressService.addressSubject.subscribe(value => {
      this.address = value;
    });
    this.addressService.emitAddress();

    this.initForm();
  }

  async addressFetch() {
    await this.addressService.getAll();
  }

  async initEntrepot(id: number) {
    this.entrepot = await this.entrepotService.getOne(id);
  }

  initForm() {
    this.entrepotForm = this.formBuilder.group({
      name: [this.entrepot.name, [Validators.required]],
      isAtelier: [this.entrepot.isAtelier],
      address: [this.entrepot.address_id, [Validators.required]]
    });
  }

  async onSubmitForm() {
    const {name, isAtelier, address} = this.entrepotForm.value;

    console.log("adr: "+address);
    const res = await this.entrepotService.update({
      id: this.entrepot.id,
      name,
      isAtelier,
      address_id:address
    });

    if (res !== null){
      this.router.navigate(['/admin/entrepot']);
    }else{
      alert("Error of update");
    }
  }
}
