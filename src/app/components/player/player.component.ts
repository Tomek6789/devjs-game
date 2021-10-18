import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { PlayerSelection } from '../../../../models/model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent {

  text = 'Make a pick'

  @Input() selection: PlayerSelection = null;
  @Input() playerScore: number | null = 0;

  @Output() playerSelection = new EventEmitter<PlayerSelection>()

  ngOnChanges(changes: SimpleChanges) {
    if(changes.selection && !changes.selection.currentValue) {
      this.text = 'Make a pick'
    }
  }

  onSelect(selection: PlayerSelection) {
    this.text = "You made a selection"
    this.playerSelection.emit(selection)
  }

  show(selection: PlayerSelection) {
    return this.selection === null || this.selection === selection
  }
}
