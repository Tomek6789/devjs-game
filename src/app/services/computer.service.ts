import { Injectable } from '@angular/core';
import { PlayerSelection } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  selections: PlayerSelection[] = ['scissors', 'rocks', 'document'];

  makeMove() {
    const random = Math.floor(Math.random() * 2);
    return this.selections[random];
  }
}
