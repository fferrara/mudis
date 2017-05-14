import {Artist} from "./artist";
import {Message} from "./message";
/**
 * Created by Flavio on 06/05/2017.
 */

export abstract class Hint extends Message{
  public static serializedType = 'HINT';

  public getType(): string {
    return Hint.serializedType;
  }
}

export class ArtistHint extends Hint{

  constructor(
    public message: string
  ) {
    super(message);
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
