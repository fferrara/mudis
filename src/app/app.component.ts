import { Component } from '@angular/core';
import {Track} from "./models/track";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isPlaylistOpen: boolean = false;

  constructor() {
  }
}
