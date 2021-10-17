import { Component } from '@angular/core';
import { GameMode, PlayerSelection } from './models';
import { StateService } from './services/+state.service';
import { AuthService } from './services/auth.service';
import { InviteService } from './services/invite.service';
import { RoomService } from './services/room.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'devjs-game';
  isLogin$ = this.auth.isLogin$
  mode: GameMode = 'opponent';

  selection: PlayerSelection = null;
  opponentSelection: PlayerSelection = null;

  selection$ = this.state.selection$;

  constructor(
    private auth: AuthService,
    private state: StateService,
    private userService: UserService,
    private roomServie: RoomService,
    private inviteService: InviteService
  ) { }

  ngOnInit() {
    this.state.game$.subscribe();
  }

  async onSignInGoogle() {
    const user = await this.auth.googleSignin();
    this.userService.createUser(user);
  }

  async onAnnonymous() {
    const user = await this.auth.annonymus();
    this.userService.createUser(user);
  }

  onSignOut() {
    this.auth.signOut();
  }

  onSelect(selection: PlayerSelection) {
    this.selection = selection

    this.state.setSelection(selection).subscribe()
  }

  async onInvitePlayer() {
    this.userService.setProfile('player')
    const roomId = await this.roomServie.createRoom();

    this.userService.setRoomId(roomId)
    this.inviteService.invitePlayer(roomId)
  }

  playWithComputer() {
    this.mode = 'computer'
  }
}
