import { Component, OnInit, Input } from '@angular/core'

import { Image } from '../image'

@Component({
  selector: 'app-portrait-image',
  templateUrl: './portrait-image.component.html',
  styleUrls: ['./portrait-image.component.css']
})
export class PortraitImageComponent implements OnInit {

  @Input() image: Image

  constructor() { }

  ngOnInit() {
  }

}
