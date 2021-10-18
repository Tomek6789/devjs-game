import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PlayerSelection } from '../../../../models/model';

@Component({
  selector: 'app-oponnet',
  templateUrl: './oponnet.component.html',
  styleUrls: ['./oponnet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OponnetComponent implements OnChanges {
  start = true;
  text = 'Waiting for the opponent'
  imgSrc = ''

  @Input() opponentSelection: PlayerSelection | undefined = undefined;
  @Input() opponentScore: number | null = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.opponentSelection && changes.opponentSelection.currentValue) {
      this.imgSrc = `../../../assets/icons/${changes.opponentSelection.currentValue}.png`
    }
  }
}
