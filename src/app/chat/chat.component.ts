import {Component, OnInit, Inject, ViewChild, ElementRef} from "@angular/core";
import {Observable} from "rxjs";
import {ChatService} from "../services/chat.service";
import {Message, Question} from "../models/message";

interface ChatMessage {
  message: string,
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
  showAnswer:boolean = false;
  isWriting:boolean = false;

  placeholder: string = null;
  firstPlaceholder: string = 'Start with something simple like: Where have you worked?'
  placeholders: Array<string> = [
    'Something about my skills?',
    'Something about my education?',
    'Something about the projects I carried out?',
    'Something about my character?'
  ]
  greeting = {
    message: 'Hey there!'
  };

  constructor(private chatService: ChatService) {
    this.chatMessages = [];
    this.window = window;
    this.showAnswer = false;
    this.chatService = chatService;
  }

  ngOnInit() {



    let delayed = this.chatService.messageStream
      .map(m => {
        return Observable.of(m).delay(2200);
      }).concatAll();

    delayed
      .startWith(this.greeting)
      .filter(message => message instanceof Message)
      .subscribe((m: Message) => {

        this.isContainerFull() &&
          window.scrollBy({ top: 90, left: 0, behavior: 'smooth' });

        this.chatMessages.push({
          message: m.message,
          isMine: false
        });

      this.showAnswer = this.checkNeedAnswer();
      this.placeholder = this.getPlaceholder();
    });

    this.chatService.messageStream
      .filter(message => message instanceof Question)
      .subscribe((q: Question) => {
        this.question = q;
        this.choices = q.choices || [];
        this.showAnswer = this.checkNeedAnswer();
      });

    //this.chatService.hintStream.subscribe(console.log)
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

  private submit(message, isChoice) {
    this.showAnswer = false;
    this.chatMessages.push({
      message: message,
      isMine: true
    });

    this.chatService.send(message, isChoice);
  }

  private checkNeedAnswer() {
    if (this.chatMessages.length == 0) return false;
    let last = this.chatMessages[this.chatMessages.length - 1];
    let needAnswer = this.question && last.message == this.question.message || false;
    this.isWriting = !needAnswer;

    return needAnswer;
  }

  private getPlaceholder(){
    if (this.showAnswer === false || this.choices.length != 0) return this.placeholder;

    return this.placeholder === null && this.firstPlaceholder || this.placeholders[Math.floor(Math.random() * this.placeholders.length)];
  }


}
