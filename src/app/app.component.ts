import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { ApiService } from './services/api.service';
import { AuthenticationService } from './services/authentication.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  {
  user: User | undefined;
  constructor(
    private apiService: ApiService,
    private auth: AuthenticationService,
    private navCtrl: NavController
  ) {}
  // public ngOnInit(): void {
  //   this.auth.authenticationState.subscribe(token => {
  //     if (token != 'logout' && token != '') {
  //       this.apiService.setTokenToHeaders(token);
  //       this.navCtrl.navigateRoot('profile').then(() => {
          
  //       });
  //     } else if (token == 'logout') {
  //       this.apiService.removeTokenToHeaders();
  //       this.navCtrl.navigateRoot('login').then(() => {   
  //       });
  //     } else {
  //       console.log("primera vez");
  //     }})}
    }
