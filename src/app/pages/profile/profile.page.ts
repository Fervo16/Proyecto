import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  public user: User | undefined;

  constructor(
    
    public api: ApiService,
    public auth: AuthenticationService,
    private storage: Storage,
  ) { }

  public async ngOnInit(): Promise<void> {
    this.getUser();
    
  }

  public back(): void {
    window.history.back();
  }
  public async getUser() {
    let res= await this.storage.get("usuario");
    console.log(res);
    this.user=res;
  }

  public logout(){
    this.api.removeTokenToHeaders;
    this.storage.remove("usuario");
  }

}
