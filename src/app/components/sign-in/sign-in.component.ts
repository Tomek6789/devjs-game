import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent {

  @Output() signInGoogle = new EventEmitter();
  @Output() annonymous = new EventEmitter();

  signInWithGoogle() {
    this.signInGoogle.emit()
  }

  onAnnonymus() {
    this.annonymous.emit()
  }

}
