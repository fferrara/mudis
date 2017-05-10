import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {ArtistHint, Hint} from "../../models/hint";
import {LikeArtist} from "../../models/message";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Artist} from "../../models/artist";

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
  @Input() hint: ArtistHint;
  @Output() onLike = new EventEmitter<Artist>();

  visible: number;

  constructor(private chatService: ChatService) {
      this.chatService = chatService;
  }

  ngOnInit() {

  }

  public sendLike(artist:Artist) {
    let outgoing = new LikeArtist(artist);
    this.chatService.send(outgoing);

    this.hint.artists = this.hint.artists.filter((a:Artist) => a !== artist);

    this.onLike.emit(artist);
  }

}
