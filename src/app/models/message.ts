/**
 * Created by Flavio on 06/05/2017.
 */


export class Message {

  constructor(
    public message: string
  ) {
    this.message = message;
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
