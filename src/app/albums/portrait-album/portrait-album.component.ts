import { Component, OnInit, Input } from '@angular/core'

import { Album } from '../album'
import { ImagesService } from '../../images/images.service'

@Component({
  selector: 'app-portrait-album',
  templateUrl: './portrait-album.component.html',
  styleUrls: ['./portrait-album.component.css'], 
  providers: [ ImagesService ]
})

export class PortraitAlbumComponent implements OnInit {

  @Input() album: Album
  constructor(private _imageService: ImagesService) { }

  ngOnInit() {
  }
}
