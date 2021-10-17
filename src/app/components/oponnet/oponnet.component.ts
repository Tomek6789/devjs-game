import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { PlayerSelection } from 'src/app/models';

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


  ngOnChanges(changes: SimpleChanges) {
    if (changes.opponentSelection.currentValue) {
      this.imgSrc = `../../../assets/icons/${changes.opponentSelection.currentValue}.png`
      console.log(this.imgSrc)
    }
  }
}
