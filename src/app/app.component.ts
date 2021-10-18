import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { PlayerSelection, Profile } from '../../models/model';
import { StateService } from './services/+state.service';
import { AuthService } from './services/auth.service';
import { ComputerService } from './services/computer.service';
import { DialogService } from './services/dialog.service';
import { InviteService } from './services/invite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'devjs-game';
  computerMode = false;
  isLogin$ = this.auth.isLogin$

  photoUrl$ = this.state.photoUrl$;
  opponentselection$ = this.state.opponentSelection$;
  playerSelection$ = this.state.playerSelection$;
  opponnetScore$ = this.state.opponentScore$;
  playerScore$ = this.state.playerScore$
  endScore$ = this.state.endScore$
  
  constructor(
    private auth: AuthService,
    private state: StateService,
    private inviteService: InviteService,
    private computerService: ComputerService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.state.gameWinner$.pipe(
      tap((winner) => this.dialogService.openDialog(winner as Profile)),
    ).subscribe()

    this.state.game$.subscribe();
  }

  async onSignInGoogle() {
    const user = await this.auth.googleSignin();
    this.state.createUser(user)
  }

  async onAnnonymous() {
    const user = await this.auth.annonymus();
    this.state.createUser(user)
  }

  onSignOut() {
    this.auth.signOut();
  }

  onEndScore(endScore: number) {
    this.state.setEndScore(+endScore);
  }

  onSelect(selection: PlayerSelection) {
    this.state.setSelection(selection).subscribe()

    if(this.computerMode) {
      const computerSelection = this.computerService.makeMove()
      this.state.setSelection(computerSelection, true);
    }
  }

  async onInvitePlayer() {
    const roomId = await this.state.initializeGame()

    this.inviteService.invitePlayer(roomId)
  }

  async playWithComputer() {
    this.computerMode = true;
    
    this.state.initializeGame()
  }
}
