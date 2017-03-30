import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { AlertModule } from 'ng2-bootstrap';
import { AllAlbumsComponent } from './albums/all-albums/all-albums.component';
import { ListAlbumsComponent } from './albums/list-albums/list-albums.component';
import { PortraitAlbumComponent } from './albums/portrait-album/portrait-album.component'

@NgModule({
  declarations: [
    AppComponent,
    AllAlbumsComponent,
    ListAlbumsComponent,
    PortraitAlbumComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
