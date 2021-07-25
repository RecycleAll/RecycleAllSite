import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Send} from "../../../../models/send.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Address} from "../../../../models/address.model";
import {SendService} from "../../../../services/send.service";
import {AddressService} from "../../../../services/address.service";
import {formatDate} from "@angular/common";
import {dateToStringForms} from "../../../../utils/dateutils";


@Component({
  selector: 'app-send-update',
  templateUrl: './send-update.component.html',
  styleUrls: ['./send-update.component.scss']
})
export class SendUpdateComponent implements OnInit {

  sendForm!: FormGroup;
  send!: Send;
  address: Address[] = [];

  constructor(private formBuilder: FormBuilder,
              private sendService: SendService,
              private addressService: AddressService,
              private route: ActivatedRoute,
              private router: Router) {
  }


  async addressFetch() {
    await this.addressService.getAll();
  }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.params['id'];
    await this.initProduct(id);

    await this.addressFetch();
    this.addressService.addressSubject.subscribe(value => {
      this.address = value;
    });
    this.addressService.emitAddress();

    this.initForm();
  }

  async initProduct(id: number) {
    this.send = await this.sendService.getOne(id);
  }

  initForm() {
    this.sendForm = this.formBuilder.group({
      address: [this.send.delivery_address, [Validators.required]],
      date: [dateToStringForms(this.send.date), [Validators.required]],
      type: [this.send.send_type, [Validators.required]],
      status: [this.send.status, [Validators.required]]
    });
  }

  async onSubmitForm() {
    let {address, date, type, status} = this.sendForm.value;
    console.log("date: "+date);
    const res = await this.sendService.update( {
      id: this.send.id,
      delivery_address:address,
      date,
      send_type: type,
      status
    });

    if (res !== null){
      this.router.navigate(['/admin/send']);
    }else{
      alert("Error of update");
    }
  }

}
