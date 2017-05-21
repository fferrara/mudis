import {Artist} from "./artist";
/**
 * Created by Flavio on 13/05/2017.
 */

export class Album {

  constructor(
    public id: number,
    public name: string,
    public artist: Artist,
    public thumbUrl: string
  ) {
    this.id = id;
    this.name = name;
    this.artist = artist;
    this.thumbUrl = thumbUrl;
  }

  public static build(data):Album {
    if (data.artists && data.artists.constructor === Array) data.artist = data.artists[0];

    return new Album(
      data.id,
      data.name,
      Artist.build(data.artist),
      data.thumb_url
    )
  }
}
