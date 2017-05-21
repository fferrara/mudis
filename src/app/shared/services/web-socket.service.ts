import { Injectable } from '@angular/core';
import {Subject, Observable, Observer} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable()
export class WebSocketService {
  private socket: Subject<MessageEvent>;
  public URL:string = environment.backend_url;

  constructor() { }

  private create(url) : Subject<MessageEvent>{
    let ws = new WebSocket(url);

    /** create observable from subscribe function **/
    let observable = Observable.create(
      (observer : Observer<MessageEvent>) => {
        ws.onmessage = observer.next.bind(observer);
        ws.onerror = observer.error.bind(observer);
        ws.onclose = observer.complete.bind(observer);

        return ws.close.bind(ws);
      }
    ).share(); // see https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/share.md
    let observer = {
      next: (msg: Object) => {
        if (ws.readyState == WebSocket.OPEN)
          ws.send(JSON.stringify(msg))
      }
    };
    return Subject.create(observer, observable)
  }

  public connect = function() {
    if (!this.socket)
      this.socket = this.create(this.URL);
    return this.socket;
  }

}
