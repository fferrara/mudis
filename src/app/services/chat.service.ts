import {Injectable} from '@angular/core';
import {WebSocketService} from "./web-socket.service";
import {Observable, Subject} from "rxjs";
import {ArtistHint, Hint} from "../models/hint";
import {Message, Question} from "../models/message";
import {Artist} from "../models/artist";

interface Data {
  type: string,
  text: string,
  choices?: Array<string>,
  artists?: Array<any>
}

@Injectable()
export class ChatService {


  public messageStream: Observable<Message>;
  public hintStream: Observable<Hint>;
  public dataStream: Subject<Data>;

  constructor(ws: WebSocketService) {
    this.dataStream = ws.connect()
      .map((msg: MessageEvent) => JSON.parse(msg.data));

    // see https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/share.md
    let published = this.dataStream.share();

    let messages = published
      .filter(data => data.type == 'MESSAGE')
      .map((data: Data) => new Message(data.text));
    let questions = published
      .filter(data => data.type == 'QUESTION')
      .map((data: Data) => new Question(data.text, data.choices));
    let hintStream = published
      .filter(data => data.type == 'ARTISTS')
      .map((data: Data) => new ArtistHint(data.text, data.artists.map(Artist.build)));

    this.messageStream = messages.merge(questions, hintStream);
  }

  public send(message: Message) {
    this.dataStream.next({
      type: message.getType(),
      text: message.getMessage()
    });
  }


}
