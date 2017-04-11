import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { AlertModule } from 'ng2-bootstrap';
import { ListAlbumsComponent } from './albums/list-albums/list-albums.component';
import { PortraitAlbumComponent } from './albums/portrait-album/portrait-album.component'

import { routing, appRoutingProviders } from './app.routing';
import { AddAlbumComponent } from './albums/add-album/add-album.component';
import { DetailAlbumComponent } from './albums/detail-album/detail-album.component'

@NgModule({
  declarations: [
    AppComponent,
    ListAlbumsComponent,
    PortraitAlbumComponent,
    AddAlbumComponent,
    DetailAlbumComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
