import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import firebase from 'firebase/compat/app';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Profile, User } from '../models';
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
      this.userUid = user.uid
    }),
    switchMap((user) => {
      return this.angularFirestore
        .collection<User>('users')
        .doc(user.uid)
        .valueChanges()
    }),
    filter((user: User | undefined): user is User => user !== undefined),
    shareReplay(1)
  );

  userProfil$ = this.userChanged$.pipe( map((user) => user.profile));
  userRoomId$ = this.userChanged$.pipe(map((user) => user.roomId));
  photoUrl$ = this.userChanged$.pipe(map((user) => user.photoUrl));
  winnerDialogUser$ = this.userChanged$.pipe(map(({photoUrl,profile}) => ({photoUrl, profile})));


  // ACTIONS/COMMANDS 
  createUser(user: firebase.User | null) {
    this.isUser(user);

    this.angularFirestore
      .collection("users").doc(user.uid).set({
        photoUrl: user.photoURL,
        bestScore: 0,
        roomId: null
      });
  }

  setProfile(profile: Profile) {
    this.angularFirestore.collection('users').doc(this.userUid).update({
      profile
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
