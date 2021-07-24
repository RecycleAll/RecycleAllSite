import {Component, Input, OnInit} from '@angular/core';
import {MediaType} from "../../../../models/media-type.model";
import {Media} from "../../../../models/media.model";

@Component({
  selector: 'app-media-item',
  templateUrl: './media-item.component.html',
  styleUrls: ['./media-item.component.scss']
})
export class MediaItemComponent implements OnInit {

  @Input() media!: Media;
  @Input() mediaType!: MediaType;

  constructor() { }

  ngOnInit(): void {
  }

}
