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
  artist?: Object
}

@Injectable()
export class ChatService {

  public chatStream: Observable<Message>;
  public artistStream: Observable<Artist>;
  public dataStream: Subject<Data>;

  constructor(ws: WebSocketService) {
    this.dataStream = ws.connect()
      .map((msg: MessageEvent) => JSON.parse(msg.data));

    let published = this.dataStream;

    let messages = published
      .filter(data => data.type == Message.serializedType)
      .map((data: Data) => new Message(data.text));
    let questions = published
      .filter(data => data.type == Question.serializedType)
      .map((data: Data) => new Question(data.text, data.choices));
    let hints = published
      .filter(data => data.type == Hint.serializedType)
      .map((data: Data) => new ArtistHint(''));

    this.chatStream = messages.merge(questions, hints);
    this.artistStream = published
      .filter(data => data.type == 'ARTIST')
      .map((data: Data) => Artist.build(data));
  }

  public send(message: Message) {
    this.dataStream.next({
      type: message.getType(),
      text: message.getMessage()
    });
  }


}
