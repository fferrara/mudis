import {Artist} from "./artist";
/**
 * Created by Flavio on 06/05/2017.
 */

export abstract class Hint {

}

export class ArtistHint extends Hint{

  constructor(
    public message: string,
    public artist: Artist
  ) {
    super();
    this.message = message;
    this.artist = artist;
  }
}

export class TrackHint extends Hint{

  constructor(
    public message: string,
    public track: string
  ) {
    super();
    this.message = message;
    this.track = track;
  }
}
