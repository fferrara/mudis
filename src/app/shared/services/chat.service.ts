import {Injectable} from '@angular/core';
import {WebSocketService} from "./web-socket.service";
import {Observable, Subject} from "rxjs";
import {ArtistHint, Hint, TracksHint} from "../../models/hint";
import {Message, Question} from "../../models/message";
import {Artist} from "../../models/artist";
import {Track} from "../../models/track";

interface Data {
  type: string,
  text: string,
  label?: string,
  choices?: Array<string>,
  hint?: string
  artist?: Object,
  track?: Object
}

@Injectable()
export class ChatService {

  public chatStream: Observable<Message>;
  public dataStream: Subject<Data>;
  private confirmations: Subject<Question>;

  public artistStream: Observable<Artist>;
  public trackStream: Observable<Track>;

  constructor(ws: WebSocketService) {
    this.dataStream = ws.connect()
      .map((msg: MessageEvent) => JSON.parse(msg.data));
    this.confirmations = new Subject();

    let messages = this.dataStream
      .filter(data => data.type == Message.serializedType)
      .map((data: Data) => new Message(data.text));
    let questions = this.dataStream
      .filter(data => data.type == Question.serializedType)
      .map((data: Data) => new Question(data.text, data.choices, data.label));

    let hints = this.dataStream
      .filter(data => data.type == Hint.serializedType)
      .map((data: Data) => {
        switch (data.hint) {
          case 'ARTISTS': return new ArtistHint('');
          case 'TRACKS': return new TracksHint('');
        }
      });

    this.chatStream = messages.merge(questions, hints, this.confirmations.asObservable());
    this.artistStream = this.dataStream
      .filter(data => data.type == 'ARTIST')
      .map((data: Data) => Artist.build(data));
    this.trackStream = this.dataStream
      .filter(data => data.type == 'TRACK')
      .map((data: Data) => Track.build(data));
  }

  public send(message: Message) {
    this.dataStream.next({
      type: message.getType(),
      text: message.getMessage()
    });
  }


  public confirm(s: string) {
    this.confirmations.next(
      new Question(s, ['Y', 'N'])
    );
  }
}
