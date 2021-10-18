import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, iif, merge } from 'rxjs';
import { delay, filter, switchMap, take, tap } from 'rxjs/operators';
import { PlayerSelection, Profile } from '../models';
import { RoomService } from './room.service';
import { UserService } from './user.service';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  // USER
  user$ = this.userService.userChanged$;
  userRoomId$ = this.userService.userRoomId$.pipe(
    filter((roomId: string | null): roomId is string => roomId !== null),
    tap((roomId) => {
      this.roomService.setRoomId(roomId)
    })
  );
  photoUrl$ = this.userService.photoUrl$;

  opponentSelection$ = this.userService.userProfil$.pipe(
    switchMap(
      (profil) => iif(() => profil === 'player', this.roomService.opponentSelection$, this.roomService.playerSelection$)))

  playerSelection$ = this.userService.userProfil$.pipe(
    switchMap(
      (profil) => iif(() => profil === 'player', this.roomService.playerSelection$, this.roomService.opponentSelection$)))

  // ROOM
  playerScore$ = this.roomService.playerScore$;
  opponentScore$ = this.roomService.opponentScore$;
  endScore$ = this.roomService.endScore$;
  gameWinner$ = this.roomService.gameWinner$;

  resetRoomState$ = this.roomService.winner$.pipe(
    delay(1500),
    tap(() => {
      this.roomService.resetState()
    })
  )

  game$ = merge(this.user$, this.userRoomId$, this.opponentInit(), this.resetRoomState$)

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private roomService: RoomService
  ) { }

  createUser(user: firebase.User | null ) {
    this.userService.createUser(user);
  }

  async initializeGame() {
    this.userService.setProfile('player')
    const roomId = await this.roomService.createRoom();
    this.userService.setRoomId(roomId)
    return roomId
  }

  opponentInit() {
    return combineLatest([
      this.activatedRoute.queryParams,
      this.userService.userProfil$,
    ]).pipe(
      filter(([params]) => Boolean(params.room)),
      take(1),
      tap(([params]) => {
        this.userService.setRoomId(params.room)
        this.userService.setProfile('opponent')
      })
    );
  };

  setSelection(selection: PlayerSelection, computer = false) {
    if(computer) {
      this.roomService.onSelection('opponent', selection)
    }

    return this.userService.userProfil$.pipe(
      take(1),
      filter((profil: Profile | undefined): profil is Profile => profil !== undefined),
      tap((profil) => {
        this.roomService.onSelection(profil, selection)
      })
    )
  }

  setEndScore(endScore: number) {
    this.roomService.setEndScore(endScore);
  }

  finishGame() {
    this.roomService.finishGame()
  }

}
