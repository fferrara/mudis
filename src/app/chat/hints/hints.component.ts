import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {Hint} from "../../models/hint";

@Component({
  selector: 'app-hints',
  templateUrl: './hints.component.html',
  styleUrls: ['./hints.component.css']
})
export class HintsComponent implements OnInit {
  public hints: Array<Hint>;

  constructor(private chatService: ChatService) {
    this.hints = [];
    this.chatService = chatService;
  }

  ngOnInit() {
    this.chatService.hintStream.subscribe(hint => {
      this.hints.push(hint)
    })
  }

}
