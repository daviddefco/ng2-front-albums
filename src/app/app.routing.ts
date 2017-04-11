import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AppComponent } from './app.component'

import { ListAlbumsComponent } from './albums/list-albums/list-albums.component'
import { AddAlbumComponent } from './albums/add-album/add-album.component'
import { DetailAlbumComponent } from './albums/detail-album/detail-album.component'

const appRoutes: Routes = [
    { path: '', component: ListAlbumsComponent },
    { path: 'add-album', component: AddAlbumComponent },
    { path: 'album/:id', component: DetailAlbumComponent },
]

export const appRoutingProviders: any[] = []
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)