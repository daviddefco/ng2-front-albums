import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/delay'
import 'rxjs/add/observable/zip'
import 'rxjs/add/observable/of'

import { Observable } from 'rxjs/Observable'

import { Album } from './album'
import { Image } from "../images/image";

@Injectable()
export class AlbumsService {

  public urlRestfulApi: string
  private placeholder: Image = {
    _id: '',
    title: '',
    album: { _id: '', description: '', title: '', portraitUrl: '' },
    fileName: 'http://www.billedbladet.dk/sites/billedbladet.dk/files/lost_media/48998.jpg'
  }

  constructor(private _http: Http) { 
    this.urlRestfulApi = 'http://localhost:3000'
  }

  getAlbums(): Observable<Album> {
    return this._http.get(this.urlRestfulApi + '/album')   
    // flats the array of one observable to a single observable
    .flatMap(albumList =>
      Observable.from(albumList.json().albums)
      // flats the array of one observable for each album in an array
      // of a single observable
      .flatMap(response => {
        let album = response as Album
        // Combine one observable for each album with the observable to 
        // get the portrait of the album
        return Observable.zip (
          Observable.of(album),
          this.getFirstImage(album._id),
          (album, uri) => {
            // Tranforms the album object adding the uri of the portrait,
            // extracted for the second observable
            album.portraitUrl = uri
            return album
          }
        )
      })
    )     
  }

  getAlbum(idAlbum: string) {
    return this._http.get(this.urlRestfulApi + `/album/${ idAlbum }`)
      .flatMap(response => response.json()).delay(700)
  }

  addAlbum(album: Album) {
    let json = JSON.stringify(album)
    return this._http.post(this.urlRestfulApi + '/album', json, { headers: this.jsonHeaders() })
      .map(response => response.json())
  }

  updateAlbum(album: Album) {
    let json = JSON.stringify(album)
    return this._http.put(
      this.urlRestfulApi + `/album/${ album._id }`, json, { headers: this.jsonHeaders() }
    )
  }

  deleteAlbum(idAlbum: string) {
    return this._http.delete(this.urlRestfulApi + `/${ idAlbum }`)
      .map(response => response.json())
  }

  getFirstImage(idAlbum: string) : Observable<string> {
    // If we use map we get an array of Observables with only one
    // observable, while what we want is a unique observable with
    // the emission of one object (the firt photo)
    return this._http.get(this.urlRestfulApi + `/image/album/${ idAlbum }`)
    .flatMap(imagesList => {
      let list: Image[] = imagesList.json().images
      list.push(this.placeholder) 
      return Observable.from(list)
        // get the first image associated with the album, we ignore rest fo images
        .take(1)
        .map(result => {
          let image = result as Image
          // Return the uri instead the whole image
          return image == this.placeholder ?
            image.fileName
            : this.urlRestfulApi + `/image-file/${ image.fileName}`
        })        
    })
  }

  private jsonHeaders(): Headers {
    let headers: Headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return headers
  }
}
