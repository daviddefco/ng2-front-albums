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

  constructor(private _http: Http) { 
    this.urlRestfulApi = 'http://localhost:3000'
  }

  /**
   * Returns all albums with small delay to simulate loading
   */
  getAlbums() {
  let observable: Observable<Response>

    return this._http.get(this.urlRestfulApi + '/album')    
    .map(albumList => {
      Observable.of(albumList.json().albums).flatMap(album =>
        Observable.zip(
          Observable.of(album),
           this.getFirstImage((<any>album)._id),
            (album, image) => {
              let response: Album = (<any>album)
              response.portraitUrl = this.urlRestfulApi + `/image-file/${ image._id }`
              return album
            }           
        )
      )
/*      
      .map(albumList => {
        return Observable.of(albumList)
      })
      */
/*      
     observable = Observable.from(albumList.json().albums)
      .flatMap(album => { 
         let b = Observable.zip(
          Observable.of(album),
          this.getFirstImage((<any>album)._id),
                (album, image) => {
                  let response: Album = (<any>album)
                  response.portraitUrl = this.urlRestfulApi + `/image-file/${ image._id }`
                  return album
                }
          )
          return b          
      })   
*/      
    })


/*    
    return this._http.get(this.urlRestfulApi + '/album')
      .flatMap(albumList => {
        let a = Observable.from(albumList.json().albums)
          .flatMap(album => { 
            let b = Observable.zip(
                Observable.of(album),
                this.getFirstImage((<any>album)._id),
                (album, image) => {
                  let response: Album = (<any>album)
                  response.portraitUrl = this.urlRestfulApi + `/image-file/${ image._id }`
                  return album
                }
            )
            return b
          })
          return a
      }).map(response => {
        console.log(response)
      })
      */
  }

  getAlbum(idAlbum: string) {
    return this._http.get(this.urlRestfulApi + `/${ idAlbum }`)
      .map(response => response.json()).delay(700)
  }

  addAlbum(album: Album) {
    let json = JSON.stringify(album)
    return this._http.post(this.urlRestfulApi, json, { headers: this.jsonHeaders() })
      .map(response => response.json())
  }

  updateAlbum(album: Album) {
    let json = JSON.stringify(album)
    return this._http.put(
      this.urlRestfulApi + `/${ album._id }`, json, { headers: this.jsonHeaders() }
    )
  }

  deleteAlbum(idAlbum: string) {
    return this._http.delete(this.urlRestfulApi + `/${ idAlbum }`)
      .map(response => response.json())
  }

  getFirstImage(idAlbum: string) : Observable<any> {
    // If we use map we get an array of Observables with only one
    // observable, while what we want is a unique observable with
    // the emission of one object (the firt photo)
    return this._http.get(this.urlRestfulApi + `/image/album/${ idAlbum }`)
    .flatMap(imagesList => {
      return Observable.from(imagesList.json().images)
        .take(1)        
    })
  }

  private jsonHeaders(): Headers {
    let headers: Headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return headers
  }
}
