import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlayerSelection } from 'src/app/models';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent {

  text = 'Make a pick'

  @Input() selection: PlayerSelection = null;
  @Output() playerSelection = new EventEmitter<PlayerSelection>()

  onSelect(selection: PlayerSelection) {
    this.selection = selection
    this.text = "You made a selection"
    this.playerSelection.emit(selection)
  }

  show(selection: PlayerSelection) {
    return this.selection === null || this.selection === selection
  }
}
