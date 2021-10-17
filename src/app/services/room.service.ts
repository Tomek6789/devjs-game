import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, merge } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { PlayerSelection, Profil, Room } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private roomId: string | undefined = '';
  private roomSuject = new BehaviorSubject<string | undefined>(undefined)

  roomChanged$ = this.roomSuject.pipe(
    switchMap((roomId) =>
      this.angularFirestore.collection<Room>('rooms').doc(roomId).valueChanges()
    ),
    shareReplay(1)
  )

  opponentSelection$ = this.roomChanged$.pipe(map((room) => room?.opponentSelection));
  playerSelection$ = this.roomChanged$.pipe(map((room) => room?.playerSelection));


  constructor(private angularFirestore: AngularFirestore) { }

  async createRoom() {
    const room = await this.angularFirestore.collection('rooms').add({
      playerSelection: null,
      opponentSelection: null,
      startGame: false,
    });
    this.roomId = room.id
    return room.id
  }

  setRoomId(roomId: string | undefined) {
    this.roomId = roomId
    this.roomSuject.next(roomId)
  }

  onSelection(profil: Profil, selection: PlayerSelection) {
    this.angularFirestore.collection('rooms').doc(this.roomId).update({
      [profil + 'Selection']: selection
    });
  }
}
