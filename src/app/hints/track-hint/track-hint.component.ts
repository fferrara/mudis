import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {Track} from "../../models/track";
import {ChatService} from "../../shared/services/chat.service";
import {TrackService} from "../../shared/services/track.service";

@Component({
  selector: 'track-hint',
  templateUrl: './track-hint.component.html',
  styleUrls: ['./track-hint.component.css']
})
export class TrackHintComponent implements OnInit {

  hints: Array<Track> = [];
  @Output() onLike = new EventEmitter<Track>();
  @Output() onPlay = new EventEmitter<Track>();

  visible: number;

  constructor(private chatService: ChatService, private trackService: TrackService) { }

  ngOnInit() {
    this.chatService.trackStream.subscribe((t: Track) => {
      this.hints.push(t);
    })

  }

}
