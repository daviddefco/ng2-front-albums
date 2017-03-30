import { Component } from '@angular/core'

import { ListAlbumsComponent } from './albums/list-albums/list-albums.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Image Album App';
}
