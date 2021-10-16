import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Output() signOut = new EventEmitter();
  @Output() computer = new EventEmitter();
  @Output() invite = new EventEmitter();

  onSignout() {
    this.signOut.emit()
  }

  playWithComputer() {
    this.computer.emit()
  }

  onInvite() {
    this.invite.emit()
  }

}
