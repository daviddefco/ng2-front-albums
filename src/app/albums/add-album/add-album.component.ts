import { Component, OnInit } from '@angular/core'

import { Router, ActivatedRoute, Params } from '@angular/router'

import { Album } from '../album'
import { AlbumsService } from '../albums.service'

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.css'],
  providers: [ AlbumsService ]
})
export class AddAlbumComponent implements OnInit {
  
  pageTitle: string = 'Add Album'
  error: boolean
  errorMessage: string

  album: Album
  
  constructor(
    private _albumServices: AlbumsService,
    private _router: Router,
  ) { 
  }

  ngOnInit() {
    this.album = { _id: '', title: '', description: '', portraitUrl: '' }
    this.error = false
    this.errorMessage = ''
  }

  onSubmit() {
    this._albumServices.addAlbum(this.album)
    .subscribe( result => {
      console.log("Album successfully created")
      this._router.navigate([`/`])
    },
    error => {
      this.error = true
      this.errorMessage = error.message
    })
  }
}
