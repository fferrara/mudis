import {Component, OnInit, Inject, ViewChild, ElementRef} from "@angular/core";
import {Observable} from "rxjs";
import {ChatService} from "../services/chat.service";
import {Choice, Message, Question} from "../models/message";
import {ArtistHint, Hint} from "../models/hint";
import {Artist} from "app/models/artist";

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

  placeholder: string = null;
  firstPlaceholder: string = 'Start with something simple like: Where have you worked?'
  placeholders: Array<string> = [
    'Something about my skills?',
    'Something about my education?',
    'Something about the projects I carried out?',
    'Something about my character?'
  ]

  constructor(private chatService: ChatService) {
    this.chatMessages = [];
    this.window = window;
    this.unAnswered = false;
    this.chatService = chatService;
  }

  ngOnInit() {
    let delayed = this.chatService.messageStream
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

    this.chatService.messageStream
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
      type: 'MESSAGE',
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
