import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {ChatService} from "../shared/services/chat.service";
import {Choice, Message, Question} from "../models/message";
import {ArtistHint, TracksHint} from "../models/hint";
import {MusicService} from "../shared/services/music.service";

interface ChatMessage {
  content: Message,
  type: string,
  isMine: boolean
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild('chatContainer')
  chatContainer: ElementRef;

  private window;
  chatMessages: Array<ChatMessage>;
  question: Question;
  answer: string;
  choices: Array<string> = [];
  unAnswered:boolean = false;
  isWriting:boolean = false;

  types = {
    message: Message.serializedType,
    question: Question.serializedType,
    hint: {
      artist: ArtistHint.serializedType,
      track: TracksHint.serializedType
    }
  };

  placeholder: string = null;
  firstPlaceholder: string = 'Start with something simple like: Where have you worked?'
  placeholders: Array<string> = [
    'Something about my skills?',
    'Something about my education?',
    'Something about the projects I carried out?',
    'Something about my character?'
  ]

  constructor(private chatService: ChatService, private musicService: MusicService) {
    this.chatMessages = [];
    this.window = window;
    this.unAnswered = false;
    this.chatService = chatService;
  }

  ngOnInit() {
    let delayed = this.chatService.chatStream
/*      .map(m => {
        return Observable.of(m).delay(2200);
      }).concatAll();*/

    delayed
      .subscribe((m: Message) => {
        this.isContainerFull() &&
          window.scrollBy({ top: 70, left: 0, behavior: 'smooth' });

        this.chatMessages.push({
          content: m,
          type: m.getType(),
          isMine: false
        });

      this.placeholder = this.getPlaceholder();
    });

    this.chatService.chatStream
      .filter(message => message instanceof Question)
      .subscribe((q: Question) => {
        this.question = q;
        this.choices = q.choices || [];
        this.unAnswered = true;
      });
  }

  private isContainerFull() {
    return this.chatContainer.nativeElement.scrollHeight > window.innerHeight;
  }

  public submitAnswer() {
    this.unAnswered = false;

    if (this.question.label === 'ChooseArtist'){
      this.chatMessages.push({
        content: new Message(this.answer),
        type: Message.serializedType,
        isMine: true
      });
      this.musicService.searchArtistName(this.answer)
        .subscribe( (artist) => {
          if (artist.constructor === Array) {
            console.log(artist);
          } else {
            this.chatService.send(new Message(artist.id.toString()));
          }
        })
      return;
    }
    if (this.question.label === 'TypeTrack'){
      this.chatMessages.push({
        content: new Message(this.answer),
        type: Message.serializedType,
        isMine: true
      });
      this.musicService.searchTrackName(this.answer)
        .subscribe( (track) => {
          if (track.constructor === Array) {
            console.log(track);
          } else {
            this.chatService.send(new Message(track.id.toString()));
          }
        })
      return;
    }

    this.submit(this.answer, false)
    this.answer = null
  }

  public submitChoice(choice) {
    this.submit(choice, true);
    this.answer = null
  }

  private submit(message : string, isChoice : boolean) {
    this.unAnswered = false;
    this.chatMessages.push({
      content: new Message(message),
      type: Message.serializedType,
      isMine: true
    });

    let outgoing = isChoice && new Choice(message) || new Message(message);

    this.chatService.send(outgoing);
  }

  private checkNeedAnswer() {
    if (this.chatMessages.length == 0) return false;
    let last = this.chatMessages[this.chatMessages.length - 1];
    let needAnswer = this.question && last.content.getMessage() == this.question.getMessage() || false;
    this.isWriting = !needAnswer;

    return needAnswer;
  }

  private getPlaceholder(){
    return this.placeholder === null && this.firstPlaceholder || this.placeholders[Math.floor(Math.random() * this.placeholders.length)];
  }
}
