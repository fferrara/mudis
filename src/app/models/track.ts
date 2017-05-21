import {Artist} from "./artist";
import {Album} from "./album";
/**
 * Created by Flavio on 13/05/2017.
 */

export class Track {
  public static serializedType = 'TRACK';

  constructor(
    public id: number,
    public name: string,
    public artist: Artist,
    public album: Album,
    public url: string
  ) {
    this.id = id;
    this.name = name;
    this.artist = artist;
    this.album = album;
    this.url = url;
  }

  public static build(data):Track {
    if (data.artists && data.artists.constructor === Array) data.artist = data.artists[0];

    return new Track(
      data.id,
      data.name,
      Artist.build(data.artist),
      Album.build(data.album),
      data.url || data.preview_url
    )
  }
}
