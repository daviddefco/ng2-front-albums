import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/delay'
import { Observable } from 'rxjs/Observable'

import { Album } from './album'

@Injectable()
export class AlbumsService {

  public urlRestfulApi: string

  constructor(private _http: Http) { 
    this.urlRestfulApi = 'http://localhost:3000/album'
  }

  /**
   * Returns all albums with small delay to simulate loading
   */
  getAlbums() {
    return this._http.get(this.urlRestfulApi)
      .map(response => response.json()).delay(1500)
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

  private jsonHeaders(): Headers {
    let headers: Headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return headers
  }
}
