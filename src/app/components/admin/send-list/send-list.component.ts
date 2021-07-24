import { Component, OnInit } from '@angular/core';
import {Send} from "../../../models/send.model";
import {SendService} from "../../../services/send.service";

@Component({
  selector: 'app-send-list',
  templateUrl: './send-list.component.html',
  styleUrls: ['./send-list.component.scss']
})
export class SendListComponent implements OnInit {

  sends: Send[] = []

  constructor(private sendService: SendService) { }

  async ngOnInit(): Promise<void> {
    await this.sendFetch();
    this.sendService.sendSubject.subscribe(
      (sends: Send[]) => {
        this.sends = sends;
      }
    )
    this.sendService.emitSend();
  }

  async sendFetch() {
    await this.sendService.getAll();
  }

}
