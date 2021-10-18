import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { WinnerDialogComponent } from '../components/winner-dialog/winner-dialog.component';
import { Profile } from '../../../models/model';
import { RoomService } from './room.service';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog, private roomService: RoomService) { }

  openDialog(gameWinner: Profile): void {
    const dialogRef = this.dialog.open(WinnerDialogComponent, {
      width: '90vw',
      height: '90vh',
      panelClass: 'custom-dialog-container',
      data: { gameWinner }
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      this.roomService.finishGame()
    });
  }
}
