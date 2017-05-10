import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {ChatComponent} from "./chat/chat.component";
import {WebSocketService} from "./services/web-socket.service";
import {EmojiModule} from "angular-emojione";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {WritingComponent} from "./chat/writing/writing.component";
import { PlaylistComponent } from './playlist/playlist.component';
import { HintComponent } from './chat/hints/hint.component';
import {ChatService} from "./services/chat.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { UserInputComponent } from './chat/user-input/user-input.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    WritingComponent,
    PlaylistComponent,
    HintComponent,
    UserInputComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    EmojiModule,
    NgbModule.forRoot(),
  ],
  providers: [WebSocketService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
