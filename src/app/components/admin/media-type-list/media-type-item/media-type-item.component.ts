import {Component, Input, OnInit} from '@angular/core';
import {MediaType} from "../../../../models/media-type.model";

@Component({
  selector: 'app-media-type-item',
  templateUrl: './media-type-item.component.html',
  styleUrls: ['./media-type-item.component.scss']
})
export class MediaTypeItemComponent implements OnInit {

  @Input() mediaType!: MediaType;

  constructor() { }

  ngOnInit(): void {
  }

}
