import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {

  show = false
  value = 3;

  @Input() photoUrl: string | null = null;
  @Input() endScorePoints: number | null = null;

  @Output() signOut = new EventEmitter();
  @Output() computer = new EventEmitter();
  @Output() invite = new EventEmitter();
  @Output() endScore = new EventEmitter<number>();
  
  ngOnChanges(changes: SimpleChanges) {
    if(changes.endScorePoints && changes.endScorePoints.currentValue) {
      this.value = changes.endScorePoints.currentValue
    }
  }

  onSignout() {
    this.signOut.emit()
  }

  playWithComputer() {
    this.computer.emit()
  }

  onInvite() {
    this.invite.emit()
  }

  onSetFinishScore() {
    this.endScore.emit(this.value);
  }

}
