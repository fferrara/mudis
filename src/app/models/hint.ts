import {Artist} from "./artist";
import {Message} from "./message";
/**
 * Created by Flavio on 06/05/2017.
 */

export abstract class Hint extends Message{
  public getType(): string {
    return 'HINT';
  }
}

export class ArtistHint extends Hint{

  constructor(
    public message: string,
    public artists: Array<Artist>
  ) {
    super(message);
    this.artists = artists;
  }
}

export class TrackHint extends Hint{

  constructor(
    public message: string,
    public track: string
  ) {
    super(message);
    this.track = track;
  }
}
