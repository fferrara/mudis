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
import { HintsComponent } from './chat/hints/hints.component';
import {ChatService} from "./services/chat.service";

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    WritingComponent,
    PlaylistComponent,
    HintsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    EmojiModule,
    NgbModule.forRoot(),
  ],
  providers: [WebSocketService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
