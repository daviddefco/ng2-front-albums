import { Album } from '../albums/album'

export interface Image {
    _id: string
    title: string
    fileName: string
    album: Album
}