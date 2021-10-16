import { Injectable } from '@angular/core';
import { PlayerSelection } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  selections: PlayerSelection[] = ['document', 'rocks', 'scissors'];

  makeMove(): PlayerSelection {
    const random = Math.floor(Math.random() * 3);
    return this.selections[random];
  }

}
