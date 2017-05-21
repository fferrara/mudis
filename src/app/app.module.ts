import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {ChatComponent} from "./chat/chat.component";
import {WebSocketService} from "./shared/services/web-socket.service";
import {EmojiModule} from "angular-emojione";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {WritingComponent} from "./chat/writing/writing.component";
import { PlaylistComponent } from './playlist/playlist.component';
import { HintComponent } from './hints/hint.component';
import {ChatService} from "./shared/services/chat.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { UserInputComponent } from './chat/user-input/user-input.component';
import {TrackService} from "./shared/services/track.service";
import {MusicService} from "./shared/services/music.service";
import { TrackHintComponent } from './hints/track-hint/track-hint.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    WritingComponent,
    PlaylistComponent,
    HintComponent,
    UserInputComponent,
    TrackHintComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    EmojiModule,
    NgbModule.forRoot(),
  ],
  providers: [WebSocketService, ChatService, TrackService, MusicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
