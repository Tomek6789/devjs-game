import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PlayerSelection, Profil, Room } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private roomId: string | undefined = '';

  constructor(private angularFirestore: AngularFirestore) { }

  async createRoom() {
    const room = await this.angularFirestore.collection('rooms').add({
      test: 'trol'
    });
    this.roomId = room.id
    return room.id
  }

  // room$ = this.angularFirestore.collection<Room>('rooms').doc(this.roomId).valueChanges();

  setRoomId(roomId: string | undefined) {
    this.roomId = roomId
  }

  onSelection(profil: Profil, selection: PlayerSelection) {
    this.angularFirestore.collection('rooms').doc(this.roomId).update({
      [profil + 'Selection']: selection
    });
  }
}
