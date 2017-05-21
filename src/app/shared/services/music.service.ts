import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Http, Response} from "@angular/http";
import {Track} from "../../models/track";
import {Artist} from "../../models/artist";

const SEARCH_API: string = 'https://api.spotify.com/v1/search';

interface TrackResponse {
  tracks: any
}

interface ArtistResponse {
  artists: any
}

@Injectable()
export class MusicService {

  constructor(private http: Http) { }

  public searchArtistName(name: string): Observable<Artist> {
    return this.search(name, 'artist').map((body:ArtistResponse) => {
      let artists = body.artists.items
        .map(Artist.build)
        .filter((artist) => artist.matchName(name))
        .sort((a, b) => a.popularity - b.popularity);

      let names = new Set(artists.map(artist => artist.name))

      if (names.size == 1) return artists[0];
      return artists;
    });
  }

  public searchTrackName(name: string): Observable<Track>{
      return this.search(name, 'track').map((body:TrackResponse) => {
        let tracks = body.tracks.items
          .filter((track) => name.toUpperCase().indexOf(track.name.toUpperCase()) !== -1)
          .sort((a, b) => a.popularity - b.popularity);

        let track =tracks[tracks.length - 1];

        return Track.build(track);
      });
  }

  private search(query: string, type?: string): Observable<any> {
    return this.http.get(SEARCH_API + `?q=${query}&type=${type || 'track'}`)
      .map(this.processResponse);
  }

  private processResponse(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body || { };
  }

  private toUnique(a, b?, c?){//array,placeholder,placeholder
    b = a.length;
    while(c = --b)
      while(c--){
        console.log(a[b])
        console.log(a[c])
        a[b].name!==a[c].name || a.splice(c,1)
      }
  }

}
