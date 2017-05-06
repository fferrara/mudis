import {Injectable} from '@angular/core';
import {WebSocketService} from "./web-socket.service";
import {Observable, Subject} from "rxjs";
import {ArtistHint, Hint} from "../models/hint";
import {Message, Question} from "../models/message";
import {Artist} from "../models/artist";

interface Data {
  type: string,
  text: string,
  choices?: Array<string>
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

    this.messageStream = published
      .map((data:Data): Message => {

          switch (data.type) {

            case 'MESSAGE': return new Message(data.text);
            case 'QUESTION': return new Question(data.text, data.choices);
          }
        }
      );

    this.hintStream = published
      .filter(data => data.type == 'ARTIST')
      .map((data: Data) => new ArtistHint(data.text, Artist.build(data)));
  }

  public send(message: string, isChoice: boolean) {
    this.dataStream.next({
      type: isChoice && 'CHOICE' || 'MESSAGE',
      text: message
    });
  }


}
