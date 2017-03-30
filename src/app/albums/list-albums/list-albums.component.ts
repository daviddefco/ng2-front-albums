import { Component, OnInit } from '@angular/core'

import { Album } from '../album'
import { AlbumsService } from '../albums.service'


@Component({
  selector: 'app-list-albums',
  templateUrl: './list-albums.component.html',
  styleUrls: ['./list-albums.component.css'],
  providers: [ AlbumsService ]
})
export class ListAlbumsComponent implements OnInit {

  albumList: Album[]
  visible: boolean
  constructor(private _albumServices: AlbumsService) {
    this.visible = false
  }

  ngOnInit() {
    this._albumServices.getAlbums().subscribe(
      result => {
        // this.albumList = result
        this.visible = true
      },
      error => {

      }
    )
  }
}
