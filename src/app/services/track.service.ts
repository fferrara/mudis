import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Track} from "../models/track";
import {WebSocketService} from "./web-socket.service";
import {Http} from "@angular/http";
import {Subject} from "rxjs/Subject";

@Injectable()
export class TrackService {
  private trackSource: Subject<Track> = new Subject();
  tracks$ = this.trackSource.asObservable();

  constructor(private http: Http, ws: WebSocketService) {
    let trackStream = ws.connect()
      .map((msg: MessageEvent) => JSON.parse(msg.data))
      .share()
      .filter(data => data.type === Track.serializedType);

    this.tracks$.merge(trackStream);
  }

  play(ids: number[]): Promise<Track[]> {
    return this.http.post('http://localhost:5000/play', {
      artists: ids
    })
      .map((res:any) => res.json())
      .toPromise()
      .then(data => {
        let tracks = data.map(Track.build);
        tracks.forEach(track => this.trackSource.next(track));
        return tracks;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
