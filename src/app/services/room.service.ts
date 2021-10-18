import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { PlayerSelection, Profile, Room } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private hasRoom = false
  private roomId: string | undefined = '';
  private roomSuject = new BehaviorSubject<string | undefined>(undefined)

  roomChanged$ = this.roomSuject.pipe(
    switchMap((roomId) =>
      this.angularFirestore.collection<Room>('rooms').doc(roomId).valueChanges()
  
      ),
    tap((room) => {
      this.hasRoom = Boolean(room)
    }),
    filter((room: Room | undefined): room is Room => room !== undefined),
    shareReplay(1)
  )

  opponentSelection$ = this.roomChanged$.pipe(map((room) => room.opponentSelection));
  playerSelection$ = this.roomChanged$.pipe(map((room) => room.playerSelection));
  playerScore$ = this.roomChanged$.pipe(map((room) => room.playerScore), distinctUntilChanged());
  opponentScore$ = this.roomChanged$.pipe(map((room) => room.opponentScore), distinctUntilChanged());
  winner$ = this.roomChanged$.pipe(map((room) => room.winner), filter(Boolean)); // can be tie two times
  endScore$ = this.roomChanged$.pipe(map((room) => room.endScore), distinctUntilChanged());
  gameWinner$ = this.roomChanged$.pipe(map((room) => room.gameWinner), tap(console.log), distinctUntilChanged(), filter(Boolean),);

  constructor(private angularFirestore: AngularFirestore, private snackBar: MatSnackBar) { }

  async createRoom() {
    const room = await this.angularFirestore.collection('rooms').add({
      playerSelection: null,
      opponentSelection: null,
      playerScore: 0,
      opponentScore: 0,
      endScore: 3,
      winner: null,
      gameWinner: null,
    });
    this.roomId = room.id
    return room.id
  }

  setRoomId(roomId: string | undefined) {
    this.roomId = roomId
    this.roomSuject.next(roomId)
  }

  onSelection(profil: Profile, selection: PlayerSelection) {
    this.angularFirestore.collection('rooms').doc(this.roomId).update({
      [profil + 'Selection']: selection
    });
  }

  resetState() {
    this.angularFirestore.collection('rooms').doc(this.roomId).update({
      playerSelection: null,
      opponentSelection: null,
      winner: null,
    })
  }

  finishGame() {
    this.angularFirestore.collection('rooms').doc(this.roomId).update({
      playerScore: null,
      opponentScore: null,
      winner: null,
      gameWinner: null
    })
  }

  setEndScore(endScore: number) {
    if(this.hasRoom) {
      this.angularFirestore.collection('rooms').doc(this.roomId).update({
        endScore
      })
    } else {
      this.snackBar.open('Invite player or Play with Computer', '', { duration: 1000 });
    }
  }
}
