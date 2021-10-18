import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OponnetComponent } from './components/oponnet/oponnet.component';
import { PlayerComponent } from './components/player/player.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { WinnerDialogComponent } from './components/winner-dialog/winner-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    NavbarComponent,


    OponnetComponent,
    PlayerComponent,
    WinnerDialogComponent

  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: "",
        component: AppComponent,
      },
    ], { relativeLinkResolution: 'legacy' }),

    MatButtonModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
