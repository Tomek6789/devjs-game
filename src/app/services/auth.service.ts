import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable, Subject } from "rxjs";
import { map, startWith, switchMap, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  private authStateChangedSubject = new Subject<firebase.User | null>()
  authStateChanged$ = this.authStateChangedSubject.asObservable();

  isLogin$ = this.authStateChanged$.pipe(map(user => !user), tap(console.log));

  // Progress na oninit


  constructor(
    private afAuth: AngularFireAuth,
  ) {
    this.afAuth.onAuthStateChanged(user => {
      this.authStateChangedSubject.next(user)
    });
  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const cred = await this.afAuth.signInWithPopup(provider);
    return cred.user;
  }


  async signOut() {
    await this.afAuth.signOut();
  }

  async annonymus() {
    const cred = await this.afAuth.signInAnonymously();
    return cred.user;
  }
}
