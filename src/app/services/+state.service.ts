import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, iif, merge } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { PlayerSelection, Profil } from '../models';
import { RoomService } from './room.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  user$ = this.userService.userChanged$;
  userRoomId$ = this.userService.userRoomId$.pipe(
    tap((roomId) => {
      this.roomService.setRoomId(roomId)
    })
  );

  selection$ = this.userService.userProfil$.pipe(
    switchMap(
      (profil) => iif(() => profil === 'player', this.roomService.opponentSelection$, this.roomService.playerSelection$)))

  game$ = merge(this.user$, this.userRoomId$, this.opponentInit())

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private roomService: RoomService
  ) { }



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

  setSelection(selection: PlayerSelection) {
    return this.userService.userProfil$.pipe(
      tap(console.log),
      take(1),
      filter((profil: Profil | undefined): profil is Profil => profil !== undefined),
      tap((profil) => {
        this.roomService.onSelection(profil, selection)
      })
    )
  }

}
