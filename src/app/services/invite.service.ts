import { Injectable } from '@angular/core';
import { Router, UrlSerializer } from '@angular/router';
import { Clipboard } from "@angular/cdk/clipboard";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  constructor(
    private router: Router,
    private serializer: UrlSerializer,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar
  ) { }

  invitePlayer(roomKey: string) {
    const tree = this.router.createUrlTree([], { queryParams: { room: roomKey } });

    this.clipboard.copy(`http://localhost:4200${this.serializer.serialize(tree)}`);
    this.snackBar.open("Send this link to your friend");
  }
}
