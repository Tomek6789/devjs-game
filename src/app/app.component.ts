import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { GameMode, PlayerSelection, Profil } from './models';
import { ComputerService } from './services/computer.service';
import { UserService } from './services/user.service';
import { RoomService } from './services/room.service';
import { ActivatedRoute } from '@angular/router';
import { InviteService } from './services/invite.service';
import { filter, take, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

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

  constructor(
    private auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private computer: ComputerService,
    private userService: UserService,
    private roomServie: RoomService,
    private inviteService: InviteService
  ) { }

  ngOnInit() {
    this.userService.userChanged$.subscribe()

    this.userService.userRoomId$.subscribe((roomId) => {
      this.roomServie.setRoomId(roomId)
    })


    // Oponnet INIt
    combineLatest([
      this.activatedRoute.queryParams,
      this.userService.userRoomId$,
    ]).pipe(take(1)).subscribe(([params, roomId]) => {
      if (params.room) {
        this.userService.setProfile('opponent')
        this.roomServie.setRoomId(roomId)
      }
    })


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
    console.log('asd')
    this.selection = selection

    this.userService.userProfil$.pipe(
      tap(console.log),
      take(1),
      filter((profil: Profil | undefined): profil is Profil => profil !== undefined),
      tap((profil) => {
        this.roomServie.onSelection(profil, selection)
      })
    ).subscribe()
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
