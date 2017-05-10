import {Artist} from "./artist";
/**
 * Created by Flavio on 06/05/2017.
 */


export class Message {

  constructor(
    public message: string
  ) {
    this.message = message;
  }

  public getType(): string {
    return 'MESSAGE';
  }

  public getMessage(): string {
    return this.message;
  }
}

export class Choice extends Message {
  public getType(): string {
    return 'CHOICE';
  }
}

export class LikeArtist extends Message {
  constructor(
    public artist: Artist
  ) {
    super(artist.id.toString());
  }

  public getType(): string {
    return 'LIKE';
  }
}

export class Question extends Message{

  constructor(
    public message: string,
    public choices: Array<string>
  ) {
    super(message);
    this.choices = choices;
  }
}
