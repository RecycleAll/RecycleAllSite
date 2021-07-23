import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Entrepot} from "../../../../models/entrepot.model";
import {EntrepotService} from "../../../../services/entrepot.service";

@Component({
  selector: 'app-entrepot-update',
  templateUrl: './entrepot-update.component.html',
  styleUrls: ['./entrepot-update.component.scss']
})
export class EntrepotUpdateComponent implements OnInit {

  entrepotForm!: FormGroup;
  entrepot!: Entrepot;

  constructor(private formBuilder: FormBuilder,
              private entrepotService: EntrepotService,
              private route: ActivatedRoute,
              private router: Router) { }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.params['id'];
    await this.initMediaType(id);
    console.log(this.entrepot);
    this.initForm();
  }

  async initMediaType(id: number) {
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

    const res = await this.entrepotService.update({
      id: this.entrepot.id,
      name,
      isAtelier,
      address_id:1 //TODO
    });

    if (res !== null){
      this.router.navigate(['/admin/entrepot']);
    }else{
      alert("Error of update");
    }
  }
}
