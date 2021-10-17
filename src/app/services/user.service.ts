import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import firebase from 'firebase/compat/app';
import { filter, map, share, shareReplay, switchMap, tap } from 'rxjs/operators';
import { PlayerSelection, Profil, User } from '../models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUid: string = '';

  constructor(
    private auth: AuthService,
    private angularFirestore: AngularFirestore,
    private snackBar: MatSnackBar
  ) { }

  // SELECTORS/QUERIES
  userChanged$ = this.auth.authStateChanged$.pipe(
    filter((user: firebase.User | null): user is firebase.User => user !== null),
    tap((user) => {
      console.log('adadsad')
      this.userUid = user.uid
    }),
    switchMap((user) => {
      return this.angularFirestore
        .collection<User>('users')
        .doc(user.uid)
        .valueChanges()
    }),
    shareReplay(1)
  );

  userProfil$ = this.userChanged$.pipe(map((user) => user?.profil));
  userRoomId$ = this.userChanged$.pipe(map((user) => user?.roomId));


  // ACTIONS/COMMANDS 
  createUser(user: firebase.User | null) {
    this.isUser(user);

    this.angularFirestore
      .collection("users").doc(user.uid).set({
        photoUrl: user.photoURL,
        bestScore: 0
      });
  }

  setProfile(profil: Profil) {
    this.angularFirestore.collection('users').doc(this.userUid).update({
      profil
    })
  }

  setRoomId(roomId: string | undefined) {
    this.angularFirestore.collection('users').doc(this.userUid).update({
      roomId
    })
  }

  // ASSERT FUNCTIONS
  private isUser(user: firebase.User | null): asserts user is firebase.User {
    if (user === null) {
      this.snackBar.open('User is not created')
    }
  }

}
