import { Component, OnInit } from '@angular/core'

import { Router, ActivatedRoute, Params } from '@angular/router'

import 'rxjs/add/observable/zip'
import { Observable } from 'rxjs/Observable'


import { Album } from '../album'
import { AlbumsService } from '../albums.service'
import { Image } from '../../images/image'
import { ImagesService } from '../../images/images.service'

@Component({
  selector: 'app-detail-album',
  templateUrl: './detail-album.component.html',
  styleUrls: ['./detail-album.component.css'],
  providers: [ AlbumsService, ImagesService ]
})
export class DetailAlbumComponent implements OnInit {
  pageTitle = "Album"
  album: Album
  imageList: Image[]
  error: boolean
  errorMessage: string

  constructor(
    private _albumService: AlbumsService,
    private _imageService: ImagesService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.album = {
      _id: '',
      title: '',
      description: '',
      portraitUrl: ''
    }
    this.error = false
    this.getAlbumInfo()
  }

  private getAlbumInfo() {
    this._route.params.subscribe((params: Params) => {
      let idAlbum = params['id']
      Observable.zip(
        this._albumService.getAlbum(idAlbum),
        this._imageService.getImagesOfAlbum(idAlbum),
        (album, images) => {          
          return { album: album, images: images }
        }
      ).subscribe(result => {
        console.log(result)
        this.album = result.album
        this.imageList = result.images
      })
    })
  }
}
