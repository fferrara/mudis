import {Component, Input, OnInit} from '@angular/core';
import {TrackService} from "../shared/services/track.service";
import {Track} from "../models/track";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  public tracks: Array<Track> = [];
  @Input('open') public isOpen: boolean;

  constructor(private trackService: TrackService) {
    this.trackService = trackService;
  }

  ngOnInit() {
    this.trackService.tracks$.subscribe((track: Track) => {
      console.log(track)
      this.tracks.push(track);
    })
  }

}
