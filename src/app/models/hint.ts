import {Artist} from "./artist";
import {Message} from "./message";
import {Track} from "./track";
/**
 * Created by Flavio on 06/05/2017.
 */

export abstract class Hint extends Message{
  public static serializedType = 'HINT';
}

export class ArtistHint extends Hint{
  public static serializedType = 'ARTISTS_HINT';
  constructor(
    public message: string
  ) {
    super(message);
  }
}

export class TracksHint extends Hint{
  public static serializedType = 'TRACKS_HINT';
  constructor(
    public message: string
  ) {
    super(message);
  }
}
