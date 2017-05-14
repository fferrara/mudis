import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {ArtistHint, Hint} from "../../models/hint";
import {LikeArtist} from "../../models/message";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Artist} from "../../models/artist";
import {Track} from "../../models/track";
import {TrackService} from "../../services/track.service";

@Component({
  selector: 'app-hint',
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({opacity: 1, transform: 'translateX(0)'})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 10 ease-out', style({
          opacity: 0,
          transform: 'translateX(100%)'
        }))
      ])
    ])
  ]
})
export class HintComponent implements OnInit {
  hints: Array<Artist> = [];
  @Output() onLike = new EventEmitter<Artist>();
  @Output() onPlay = new EventEmitter<Track>();

  visible: number;

  constructor(private chatService: ChatService, private trackService: TrackService) { }

  ngOnInit() {
    this.chatService.artistStream.subscribe((a: Artist) => {
      this.hints.push(a);
    })

  }

  public sendLike(artist:Artist) {
    let outgoing = new LikeArtist(artist);
    this.chatService.send(outgoing);

    this.hints = this.hints.filter((a:Artist) => a !== artist);

    this.onLike.emit(artist);
  }

  public play() {
    let ids = this.hints.map((a: Artist) => a.id);
    this.trackService.play(ids)
      .then((tracks:Track[]) => {
        tracks.forEach(this.onPlay.emit)
      })
  }

}
