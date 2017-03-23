import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/delay'

import { Image } from './image'

@Injectable()
export class ImagesService {

  public urlRestfulApi: string

  constructor(private _http: Http) { 
    this.urlRestfulApi = 'http://localhost:3000'
  }

  getImages() {
    return this._http.get(this.urlRestfulApi + '/image')
      .map(response => response.json()).delay(1250)
  }

  getImage(imageId: string) {
    return this._http.get(this.urlRestfulApi + `/image/${ imageId }`)
      .map(response => response.json()).delay(450)
  }

  addImage(image: Image) {
    let json = JSON.stringify(image)
    return this._http.post(
      this.urlRestfulApi + '/image', json, this.jsonHeaders()
    ).map(response => response.json())
  }

  updateImage(image: Image) {

  }
  private jsonHeaders(): Headers {
    let headers: Headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return headers
  }

  private imageHeaders(): Headers {
    let headers: Headers = new Headers()
    headers.append('Content-Type', 'image/jpeg')
    return headers
  }
}
